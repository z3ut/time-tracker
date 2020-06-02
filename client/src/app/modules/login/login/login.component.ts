import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { UserLogin, LoginSuccess, LoginFailed } from 'src/app/store/actions/auth';
import { ToasterService } from 'angular2-toaster';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: '';
  password: '';
  isLoading = false;

  private returnUrl: string;

  private ngUnsubscribe = new Subject();

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

    this.actions$
      .pipe(
        ofActionDispatched(LoginSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.router.navigate([this.returnUrl]);
      });

    this.actions$
      .pipe(
        ofActionDispatched(LoginFailed),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.toasterService.pop('error', 'Login error');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  login() {
    if (!this.username || !this.password) {
      this.toasterService.pop('warning', 'Enter username/password');
      return;
    }

    this.isLoading = true;
    this.store.dispatch(new UserLogin(this.username, this.password));
  }

}
