import { User } from 'src/app/models/user';

export class RegisterSuccess {
  static readonly type = '[User] RegisterSuccess';

  constructor(public user: User) {}
}
