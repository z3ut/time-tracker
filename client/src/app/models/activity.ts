export interface Activity {
  id?: number;
  userId: number;
  projectId?: number;
  title: string;
  dateTimeStart: Date;
  dateTimeEnd?: Date;
}
