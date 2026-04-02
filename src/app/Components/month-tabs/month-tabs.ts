import { Component, EventEmitter, OnInit, Output, output, signal } from '@angular/core';
import { DataService } from '../../Core/Service/data-service';
import { FormsModule } from '@angular/forms';
import { MonthlyTabsList } from '../../Core/models/notification.model';

@Component({
  selector: 'app-month-tabs',
  imports: [FormsModule],
  templateUrl: './month-tabs.html',
  styleUrl: './month-tabs.scss',
})
export class MonthTabs implements OnInit {
  yearsList = signal<number[]>([]);
  monthsList = signal<any[]>([
    { label: 'Jan', value: 1 },
    { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 4 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 6 },
    { label: 'Jul', value: 7 },
    { label: 'Aug', value: 8 },
    { label: 'Sep', value: 9 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 },
    { label: 'Dec', value: 12 },
  ]);

  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;

  @Output() onMonthYearChange = new EventEmitter<{ month: number; year: number }>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getMonthYearList();
  }

  getMonthYearList() {
    this.dataService.getMonthlyTabsList().subscribe((res: MonthlyTabsList) => {
      this.yearsList.set(
        Object.keys(res)?.length
          ? Object.keys(res)
              .map(Number)
              .sort((a, b) => b - a)
          : [],
      );
    });
  }

  onYearChange() {
    this.selectedMonth =
      this.selectedYear == new Date().getFullYear()
        ? new Date().getMonth() + 1
        : this.selectedYear == 2024
          ? 5
          : 1;
    this.onMonthYearChange.emit({ month: this.selectedMonth, year: this.selectedYear });
  }

  onMonthChange(currentMonth: number) {
    if (this.isMonthDisabled(currentMonth)) return;
    this.selectedMonth = currentMonth;
    this.onMonthYearChange.emit({ month: this.selectedMonth, year: this.selectedYear });
  }

  isMonthDisabled(month: number): boolean {
    return (
      (this.selectedYear <= 2024 && month < 5) ||
      (this.selectedYear >= this.currentYear && month > this.currentMonth)
    );
  }
}
