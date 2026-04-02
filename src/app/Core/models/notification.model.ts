export interface Notification {
  notificationId: string;
  name: string;
  profile: string;
  notification: string;
  notificationDate: string;
  notificationStatus: string;
  isNotificationMarkedAsRead?: boolean;
  isNotificationAlreadyRead?: boolean;
}

export interface MonthTab {
  month: string;
  hasNotification: boolean;
  monthIndex: number;
}

export interface MonthlyTabsList {
  [year: string]: MonthTab[];
}

export interface SummaryDetail {
  notificationCount: number;
  notificationReadCount: number;
  notificationUnreadCount: number;
  lastNotifictionReceivedDateTime: string;
}
