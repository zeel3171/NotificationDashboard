import { Component, computed, OnInit, signal } from '@angular/core';
import { MonthTabs } from '../month-tabs/month-tabs';
import { SummaryTabs } from '../summary-tabs/summary-tabs';
import { DataService } from '../../Core/Service/data-service';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../Shared/Pipes/capitalize-pipe';
import { MonthlyTabsList, Notification, MonthTab } from '../../Core/models/notification.model';

@Component({
  selector: 'app-dashboard',
  imports: [MonthTabs, SummaryTabs, FormsModule, CapitalizePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  constructor(private dataService: DataService) {}

  searchTerm = signal<string>('');
  selectAllNotifications = signal<boolean>(false);
  monthsTabsList = signal<MonthlyTabsList>({});
  notificationDataList = signal<Notification[]>([]);

  selectedYear = signal<number>(new Date().getFullYear());
  selectedMonth = signal<number>(new Date().getMonth() + 1);

  async ngOnInit(): Promise<void> {
    await this.getMonthsNotificationData();
    this.getNotificationData();
  }

  getMonthsNotificationData() {
    return new Promise((resolve, reject) => {
      this.dataService.getMonthlyTabsList().subscribe(
        (res: MonthlyTabsList) => {
          this.monthsTabsList.set(res);
          resolve(true);
        },
        (err) => {
          console.log(err);
          reject(false);
        },
      );
    });
  }

  getNotificationData() {
    this.dataService.getNotificationList().subscribe(
      (res: Notification[]) => {
        this.notificationDataList.set(res);
      },
      (err) => {
        console.error(err);
      },
    );
  }

  hasMonthData = computed(() => {
    const yearStr = this.selectedYear().toString();
    const monthList = this.monthsTabsList()[yearStr] || [];
    const monthInfo = monthList.find((m: MonthTab) => m.monthIndex == this.selectedMonth());
    return monthInfo ? monthInfo.hasNotification : false;
  });

  totalReadCount = computed(() => {
    return this.filteredNotifications().filter(
      (n: Notification) => n.isNotificationMarkedAsRead && !n.isNotificationAlreadyRead,
    ).length;
  });

  allNotificationRead = computed(() => {
    return this.filteredNotifications().every((n: Notification) => n.isNotificationAlreadyRead);
  });

  filteredNotifications = computed(() => {
    if (!this.hasMonthData()) return [];

    let filtered = this.notificationDataList().filter((n: Notification) => {
      const [day, month, year] = n.notificationDate.split('-');
      return Number(month) == this.selectedMonth() && Number(year) == this.selectedYear();
    });
    return this.onSearch(filtered);
  });

  onSearch(data: Notification[]) {
    const searchText = this.searchTerm().toLowerCase().trim();
    if (searchText) {
      data = data.filter(
        (n: Notification) =>
          n.notification.toLowerCase().includes(searchText) ||
          n.name.toLowerCase().includes(searchText),
      );
    }
    return data;
  }

  onMonthYearChange(event: any) {
    this.selectedYear.set(event?.year);
    this.selectedMonth.set(event?.month);
  }

  onMarkAsRead(event: any, item: Notification) {
    item.isNotificationMarkedAsRead = event.target.checked;
    this.selectAllNotifications.set(
      this.filteredNotifications().every((x) => x?.isNotificationMarkedAsRead) ? true : false,
    );
    this.updateNotificationList();
  }

  onAllMarkAsRead(event: any) {
    if (event.target.checked) {
      this.filteredNotifications().forEach((n: Notification) => {
        n.isNotificationMarkedAsRead = true;
      });
    } else {
      this.filteredNotifications().forEach((n: Notification) => {
        if (!n.isNotificationAlreadyRead) {
          n.isNotificationMarkedAsRead = false;
        }
      });
    }
    this.updateNotificationList();
  }

  markAsRead() {
    this.filteredNotifications().forEach((n: Notification) => {
      n.isNotificationAlreadyRead = n.isNotificationMarkedAsRead;
    });
    this.updateNotificationList();
  }

  markAsUnread() {
    this.selectAllNotifications.set(false);
    this.filteredNotifications().forEach((n: Notification) => {
      n.isNotificationMarkedAsRead = false;
      n.isNotificationAlreadyRead = false;
    });
    this.updateNotificationList();
  }

  updateNotificationList() {
    this.notificationDataList.update((list) => [...list]);
  }
}
