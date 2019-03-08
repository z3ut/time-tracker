import { Activity } from 'src/app/models/activity';

export class AddActivity {
  static readonly type = '[Activities] AddActivity';

  constructor(
    public activity: Activity
  ) {}
}
