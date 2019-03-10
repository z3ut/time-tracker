export class UserRegister {
  static readonly type = '[User] UserRegister';

  constructor(
    public username: string,
    public password: string
  ) {}
}
