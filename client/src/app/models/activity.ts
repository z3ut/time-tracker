export interface Activity {
  id?: number;
  userId: number;
  workspaceId?: number;
  projectId?: number;
  title: string;
  dateTimeStart: Date;
  dateTimeEnd?: Date;
  amountSeconds?: number;
}
