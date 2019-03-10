import { User } from 'src/app/models/user';

export class LoginSuccess {
  static readonly type = '[User] LoginSuccess';

  constructor(public user: User) {}
}
