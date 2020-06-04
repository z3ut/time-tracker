import { Injectable } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = 'api/v1.0/activities';

  constructor(private http: HttpClient) { }

  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity).pipe(
      map(a => this.extractActivity(a))
    );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/${activity.id}`, activity).pipe(
      map(a => this.extractActivity(a))
    );
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(this.apiUrl, {
      params: {
        id: id.toString()
      }
    }).pipe(
      map(a => this.extractActivity(a))
    );
  }

  getUserActivities(userId: number, dateTimeFrom: Date, dateTimeTo: Date,
                    workspaceId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `api/v1.0/users/${userId}/workspaces/${workspaceId}/activities`, {
        params: {
          dateTimeFrom: dateTimeFrom.toISOString(),
          dateTimeTo: dateTimeTo && dateTimeTo.toISOString()
        }
      }).pipe(
        map(a => this.extractActivities(a))
      );
  }

  getWorkspaceActivities(dateTimeFrom: Date, dateTimeTo: Date,
                         workspaceId: number): Observable<Activity[]>  {
    return this.http.get<Activity[]>(
      `api/v1.0/workspaces/${workspaceId}/activities`, {
        params: {
          dateTimeFrom: dateTimeFrom.toISOString(),
          dateTimeTo: dateTimeTo && dateTimeTo.toISOString()
        }
      }).pipe(
        map(a => this.extractActivities(a))
      );
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private extractActivities(activities: Activity[]): Activity[] {
    return activities.map(a => this.extractActivity(a));
  }

  private extractActivity(activity: Activity): Activity {
    if (activity.dateTimeStart) {
      activity.dateTimeStart = new Date(activity.dateTimeStart);
    }

    if (activity.dateTimeEnd) {
      activity.dateTimeEnd = new Date(activity.dateTimeEnd);
    }

    if (activity.dateTimeStart && activity.dateTimeEnd) {
      activity.amountSeconds = (activity.dateTimeEnd.getTime() -
        activity.dateTimeStart.getTime()) / 1000;
    }

    return activity;
  }
}
