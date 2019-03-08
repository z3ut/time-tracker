import { Activity } from 'src/app/models/activity';

export class AddCurrentActivities {
  static readonly type = '[Activities] AddCurrentActivities';

  constructor(
    public activities: Activity[],
    public loadedFrom: Date,
    public loadedTo: Date
  ) {}
}
