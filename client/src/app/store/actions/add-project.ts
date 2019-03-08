import { Project } from 'src/app/models/project';

export class AddProject {
  static readonly type = '[Activities] AddProject';

  constructor(
    public project: Project
  ) {}
}
