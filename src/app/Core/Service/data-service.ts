import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyTabsList, SummaryDetail, Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getMonthlyTabsList() {
    return this.http.get<MonthlyTabsList>('data/month-tabs.json');
  }

  getSummaryList() {
    return this.http.get<SummaryDetail>('data/summary-list.json');
  }

  getNotificationList() {
    return this.http.get<Notification[]>('data/notification-list.json');
  }
}
