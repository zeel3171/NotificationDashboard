import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DataService } from '../../Core/Service/data-service';
import { NgClass } from '@angular/common';
import { SummaryDetail } from '../../Core/models/notification.model';

@Component({
  selector: 'app-summary-tabs',
  imports: [NgClass],
  templateUrl: './summary-tabs.html',
  styleUrl: './summary-tabs.scss',
})
export class SummaryTabs implements OnInit {
  constructor(private dataService: DataService) {}

  summaryDetails = signal<SummaryDetail | null>(null);

  ngOnInit(): void {
    this.getSummaryDetails();
  }

  getSummaryDetails() {
    this.dataService.getSummaryList().subscribe(
      (res) => {
        this.summaryDetails.set(res);
      },
      (err) => {
        console.error(err);
      },
    );
  }

  summaryDetailObj = computed(() => {
    const detail = this.summaryDetails() || null;
    return [
      {
        label: detail?.notificationCount ?? 0,
        icon: 'bx bx-user',
        labelName: 'No. of Notifications',
        colorClass: 'blue',
      },
      {
        label: this.formatDate(detail?.lastNotifictionReceivedDateTime ?? ''),
        icon: 'bx bx-calendar',
        labelName: 'Last Notification Received',
        colorClass: 'orange',
      },
      {
        label: detail?.notificationReadCount ?? 0,
        icon: 'bx bx-check-circle',
        labelName: 'Total Read',
        colorClass: 'green',
      },
      {
        label: detail?.notificationUnreadCount ?? 0,
        icon: 'bx bx-bar-chart',
        labelName: 'Total Unread',
        colorClass: 'pink',
      },
    ];
  });

  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
