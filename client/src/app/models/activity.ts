export interface Activity {
  id?: number;
  userId: number;
  title: string;
  dateTimeStart: Date;
  dateTimeEnd?: Date;
}
