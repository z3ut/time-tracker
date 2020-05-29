import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { CreateWorkspaceSuccess, CreateWorkspaceError, CreateWorkspace } from 'src/app/store/actions/workspace';
import { Workspace } from 'src/app/models/workspace';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss']
})
export class CreateWorkspaceComponent implements OnInit, OnDestroy {

  name = '';
  isLoading = false;

  @Output() created = new EventEmitter<Workspace>();
  @Output() canceled = new EventEmitter<Workspace>();

  private ngUnsubscribe = new Subject();

  constructor(private toasterService: ToasterService,
              private spinnerService: SpinnerService,
              private store: Store,
              private actions$: Actions) { }

  ngOnInit() {
    this.actions$
      .pipe(
        ofActionDispatched(CreateWorkspaceSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ workspace }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.resetForm();
        this.created.emit(workspace);
      });

    this.actions$
      .pipe(
        ofActionDispatched(CreateWorkspaceError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error creating workspace');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  create() {
    if (!this.name) {
      this.toasterService.pop('warning', 'Enter workspace name');
      return;
    }

    this.isLoading = true;
    this.spinnerService.show();

    const state = this.store.snapshot();

    this.store.dispatch(new CreateWorkspace({
      name: this.name,
      userId: state.app.auth.user.id
    }));
  }

  cancel() {
    this.isLoading = false;
    this.spinnerService.hide();
    this.canceled.emit();
  }

  private resetForm() {
    this.name = '';
  }
}
