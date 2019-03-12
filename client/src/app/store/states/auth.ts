import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import {
  CheckIsLogged,
  UserLogin, LoginSuccess, LoginFailed, UserLogout,
  UserRegister, RegisterSuccess, RegisterFailed
} from '../actions/auth';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

export interface AuthStateModel {
  user: User;
  isLogged: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    isLogged: false
  }
})
export class AuthState implements NgxsOnInit  {

  constructor(private authService: AuthService) {}

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new CheckIsLogged());
  }

  @Action(CheckIsLogged)
  checkIsLogged(ctx: StateContext<AuthStateModel>) {
    if (this.authService.isLogged()) {
      const user = this.authService.getUser();
      ctx.dispatch(new LoginSuccess(user));
    }
  }

  @Action(UserLogin)
  userLogin(ctx: StateContext<AuthStateModel>, action: UserLogin) {
    this.authService
      .login({ username: action.username, password: action.password })
      .subscribe(user => {
        ctx.dispatch(new LoginSuccess(user));
      }, err => {
        ctx.dispatch(new LoginFailed());
      });
  }

  @Action(UserLogout)
  userLogout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      user: null,
      isLogged: false
    });
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({
      user: action.user,
      isLogged: true
    });
  }

  @Action(UserRegister)
  userRegister(ctx: StateContext<AuthStateModel>, action: UserRegister) {
    return this.authService
      .register({ username: action.username, password: action.password })
      .subscribe(user => {
        ctx.dispatch(new RegisterSuccess(user));
      }, err => {
        ctx.dispatch(new RegisterFailed());
      });
  }

  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<AuthStateModel>, action: RegisterSuccess) {
    ctx.patchState({
      user: action.user,
      isLogged: true
    });
  }
}
