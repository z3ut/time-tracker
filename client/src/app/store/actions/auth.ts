import { User } from 'src/app/models/user';

export class CheckIsLogged {
  static readonly type = '[Auth] CheckIsLogged';
}

export class LoginFailed {
  static readonly type = '[Auth] LoginFailed';
}

export class LoginSuccess {
  static readonly type = '[Auth] LoginSuccess';

  constructor(public user: User) {}
}

export class RegisterFailed {
  static readonly type = '[Auth] RegisterFailed';
}

export class RegisterSuccess {
  static readonly type = '[Auth] RegisterSuccess';

  constructor(public user: User) {}
}

export class UserLogin {
  static readonly type = '[Auth] UserLogin';

  constructor(
    public username: string,
    public password: string
  ) {}
}

export class UserLogout {
  static readonly type = '[Auth] UserLogout';
}

export class UserRegister {
  static readonly type = '[Auth] UserRegister';

  constructor(
    public username: string,
    public password: string
  ) {}
}
