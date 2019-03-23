import { Project } from 'src/app/models/project';

export class CreateProject {
  static readonly type = '[Projects] CreateProject';

  constructor(public project: Project) {}
}

export class CreateProjectSuccess {
  static readonly type = '[Projects] CreateProjectSuccess';

  constructor(public project: Project) {}
}

export class CreateProjectError {
  static readonly type = '[Projects] CreateProjectError';

  constructor(public project: Project) {}
}


export class GetProject {
  static readonly type = '[Projects] GetProject';

  constructor(public id: number) {}
}

export class GetProjectSuccess {
  static readonly type = '[Projects] GetProjectSuccess';

  constructor(public project: Project) {}
}

export class GetProjectError {
  static readonly type = '[Projects] GetProjectError';

  constructor(public id: number) {}
}


export class UpdateProject {
  static readonly type = '[Projects] UpdateProject';

  constructor(public project: Project) {}
}

export class UpdateProjectSuccess {
  static readonly type = '[Projects] UpdateProjectSuccess';

  constructor(public project: Project) {}
}

export class UpdateProjectError {
  static readonly type = '[Projects] UpdateProjectError';

  constructor(public project: Project) {}
}


export class DeleteProject {
  static readonly type = '[Projects] DeleteProject';

  constructor(public id: number) {}
}

export class DeleteProjectSuccess {
  static readonly type = '[Projects] DeleteProjectSuccess';

  constructor(public id: number) {}
}

export class DeleteProjectError {
  static readonly type = '[Projects] DeleteProjectError';

  constructor(public id: number) {}
}


export class LoadUserProjects {
  static readonly type = '[Projects] LoadUserProjects';

  constructor(public userId: number, public workspaceId: number) {}
}

export class LoadUserProjectsSuccess {
  static readonly type = '[Projects] LoadUserProjectsSuccess';

  constructor(public projects: Project[]) {}
}

export class LoadUserProjectsError {
  static readonly type = '[Projects] LoadUserProjectsError';

  constructor(public userId: number, public workspaceId: number) {}
}
