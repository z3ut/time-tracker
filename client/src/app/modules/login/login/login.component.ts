import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { UserLogin, LoginSuccess, LoginFailed } from 'src/app/store/actions/user';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: '';
  password: '';
  isLoading = false;

  private returnUrl: string;

  constructor(
    private spinnerService: SpinnerService,
    private toasterService: ToasterService,
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
      this.toasterService.pop('warning', 'Enter username/password');
      return;
    }

    this.isLoading = true;
    this.spinnerService.show();
    this.store.dispatch(new UserLogin(this.username, this.password));

    this.actions$
      .pipe(ofActionDispatched(LoginSuccess))
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.router.navigate([this.returnUrl]);
      });

    this.actions$
      .pipe(ofActionDispatched(LoginFailed))
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Login error');
      });
  }

}
