import { Activity } from 'src/app/models/activity';

export class RemoveActivity {
  static readonly type = '[Activities] RemoveActivity';

  constructor(
    public activity: Activity
  ) {}
}
