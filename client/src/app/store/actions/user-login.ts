export class UserLogin {
  static readonly type = '[User] UserLogin';

  constructor(
    public username: string,
    public password: string
  ) {}
}
