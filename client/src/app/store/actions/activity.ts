import { Activity } from 'src/app/models/activity';

export class CreateActivity {
  static readonly type = '[Activities] CreateActivity';

  constructor(public activity: Activity) {}
}

export class CreateActivitySuccess {
  static readonly type = '[Activities] CreateActivitySuccess';

  constructor(public activity: Activity) {}
}

export class CreateActivityError {
  static readonly type = '[Activities] CreateActivityError';

  constructor(public activity: Activity) {}
}


export class GetActivity {
  static readonly type = '[Activities] GetActivity';

  constructor(public id: number) {}
}

export class GetActivitySuccess {
  static readonly type = '[Activities] GetActivitySuccess';

  constructor(public activity: Activity) {}
}

export class GetActivityError {
  static readonly type = '[Activities] GetActivityError';

  constructor(public id: number) {}
}


export class UpdateActivity {
  static readonly type = '[Activities] UpdateActivity';

  constructor(public activity: Activity) {}
}

export class UpdateActivitySuccess {
  static readonly type = '[Activities] UpdateActivitySuccess';

  constructor(public activity: Activity) {}
}

export class UpdateActivityError {
  static readonly type = '[Activities] UpdateActivityError';

  constructor(public activity: Activity) {}
}


export class DeleteActivity {
  static readonly type = '[Activities] DeleteActivity';

  constructor(public id: number) {}
}

export class DeleteActivitySuccess {
  static readonly type = '[Activities] DeleteActivitySuccess';

  constructor(public id: number) {}
}

export class DeleteActivityError {
  static readonly type = '[Activities] DeleteActivityError';

  constructor(public id: number) {}
}


export class LoadMoreCurrentActivities {
  static readonly type = '[Activities] LoadMoreCurrentActivities';

  constructor(public workspaceId: number) {}
}

export class LoadMoreCurrentActivitiesSuccess {
  static readonly type = '[Activities] LoadMoreCurrentActivitiesSuccess';

  constructor(public activities: Activity[]) {}
}

export class LoadMoreCurrentActivitiesError {
  static readonly type = '[Activities] LoadMoreCurrentActivitiesError';

  constructor(public workspaceId: number) {}
}
