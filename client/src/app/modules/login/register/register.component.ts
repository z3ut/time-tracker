import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/store/actions/user-register';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { RegisterSuccess } from 'src/app/store/actions/register-success';
import { RegisterFailed } from 'src/app/store/actions/register-failed';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: '';
  password: '';

  constructor(
    private spinnerService: SpinnerService,
    private store: Store,
    private actions$: Actions,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (!this.username || !this.password) {
      alert('validate input');
      return;
    }

    this.spinnerService.show();
    this.store.dispatch(new UserRegister(this.username, this.password));

    this.actions$
      .pipe(ofActionDispatched(RegisterSuccess))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        this.router.navigate(['']);
      });

    this.actions$
      .pipe(ofActionDispatched(RegisterFailed))
      .subscribe(({ payload }) => {
        this.spinnerService.hide();
        alert('Register error');
      });
  }
}
