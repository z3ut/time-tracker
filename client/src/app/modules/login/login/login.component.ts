import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { UserLogin } from 'src/app/store/actions/user-login';
import { LoginSuccess } from 'src/app/store/actions/login-success';
import { LoginFailed } from 'src/app/store/actions/login-failed';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: '';
  password: '';

  private returnUrl: string;

  constructor(
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private actions$: Actions) { }

  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (!this.username || !this.password) {
      alert('validate input');
      return;
    }

    this.store.dispatch(new UserLogin(this.username, this.password));

    this.actions$
      .pipe(ofActionDispatched(LoginSuccess))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.router.navigate([this.returnUrl]);
      });

    this.actions$
      .pipe(ofActionDispatched(LoginFailed))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        alert('Auth error');
      });
  }

}
