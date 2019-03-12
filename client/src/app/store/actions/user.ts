import { User } from 'src/app/models/user';

export class CheckIsLogged {
  static readonly type = '[User] CheckIsLogged';
}

export class LoginFailed {
  static readonly type = '[User] LoginFailed';
}

export class LoginSuccess {
  static readonly type = '[User] LoginSuccess';

  constructor(public user: User) {}
}

export class RegisterFailed {
  static readonly type = '[User] RegisterFailed';
}

export class RegisterSuccess {
  static readonly type = '[User] RegisterSuccess';

  constructor(public user: User) {}
}

export class UserLogin {
  static readonly type = '[User] UserLogin';

  constructor(
    public username: string,
    public password: string
  ) {}
}

export class UserLogout {
  static readonly type = '[User] UserLogout';
}

export class UserRegister {
  static readonly type = '[User] UserRegister';

  constructor(
    public username: string,
    public password: string
  ) {}
}
