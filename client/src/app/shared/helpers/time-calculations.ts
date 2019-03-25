import { Activity } from 'src/app/models/activity';

export function calculateActivitiesTotalTimeSeconds(activities: Activity[]): number {
  if (!Array.isArray(activities)) {
    return 0;
  }
  return activities.reduce((acc, cur) => acc + cur.amountSeconds, 0);
}
