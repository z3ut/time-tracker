import { User } from 'src/app/models/user';

export class UserLogin {
  static readonly type = '[User] UserLogin';

  constructor(
    public user: User
  ) {}
}
