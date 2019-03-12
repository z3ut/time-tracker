import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { UserRegister, RegisterSuccess, RegisterFailed } from 'src/app/store/actions/auth';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: '';
  password: '';
  isLoading = false;

  constructor(
    private spinnerService: SpinnerService,
    private toasterService: ToasterService,
    private store: Store,
    private actions$: Actions,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (!this.username || !this.password) {
      this.toasterService.pop('warning', 'Enter username/password');
      return;
    }

    this.isLoading = true;
    this.spinnerService.show();
    this.store.dispatch(new UserRegister(this.username, this.password));

    this.actions$
      .pipe(ofActionDispatched(RegisterSuccess))
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.router.navigate(['']);
      });

    this.actions$
      .pipe(ofActionDispatched(RegisterFailed))
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Registration error');
      });
  }
}
