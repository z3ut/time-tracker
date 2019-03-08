import { Project } from 'src/app/models/project';

export class RemoveProject {
  static readonly type = '[Activities] RemoveProject';

  constructor(
    public project: Project
  ) {}
}
