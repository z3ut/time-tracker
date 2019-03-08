import { Activity } from '../models/activity';
import { Project } from '../models/project';
import { User } from '../models/user';

export interface AppStateModel {
  isLogged: boolean;
  user: User;
  currentActivities: Activity[];
  currentActivitiesLoadedFrom: Date;
  projects: Project[];
}
