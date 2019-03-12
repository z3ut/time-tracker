import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import {
  CheckIsLogged,
  UserLogin, LoginSuccess, LoginFailed, UserLogout,
  UserRegister, RegisterSuccess, RegisterFailed
} from '../actions/user';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

export interface UserStateModel {
  user: User;
  isLogged: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    isLogged: false
  }
})
export class UserState implements NgxsOnInit  {

  constructor(private authService: AuthService) {}

  ngxsOnInit(ctx: StateContext<UserStateModel>) {
    ctx.dispatch(new CheckIsLogged());
  }

  @Action(CheckIsLogged)
  checkIsLogged(ctx: StateContext<UserStateModel>) {
    if (this.authService.isLogged()) {
      const user = this.authService.getUser();
      ctx.dispatch(new LoginSuccess(user));
    }
  }

  @Action(UserLogin)
  userLogin(ctx: StateContext<UserStateModel>, action: UserLogin) {
    this.authService
      .login({ username: action.username, password: action.password })
      .subscribe(user => {
        ctx.dispatch(new LoginSuccess(user));
      }, err => {
        ctx.dispatch(new LoginFailed());
      });
  }

  @Action(UserLogout)
  userLogout(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      user: null,
      isLogged: false
    });
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<UserStateModel>, action: LoginSuccess) {
    ctx.patchState({
      user: action.user,
      isLogged: true
    });
  }

  @Action(UserRegister)
  userRegister(ctx: StateContext<UserStateModel>, action: UserRegister) {
    return this.authService
      .register({ username: action.username, password: action.password })
      .subscribe(user => {
        ctx.dispatch(new RegisterSuccess(user));
      }, err => {
        ctx.dispatch(new RegisterFailed());
      });
  }

  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<UserStateModel>, action: RegisterSuccess) {
    ctx.patchState({
      user: action.user,
      isLogged: true
    });
  }
}
