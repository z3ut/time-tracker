import { Activity } from 'src/app/models/activity';

export class UpdateActivity {
  static readonly type = '[Activities] UpdateActivity';

  constructor(
    public activity: Activity
  ) {}
}
