import { Project } from 'src/app/models/project';

export class UpdateProject {
  static readonly type = '[Activities] UpdateProject';

  constructor(
    public project: Project
  ) {}
}
