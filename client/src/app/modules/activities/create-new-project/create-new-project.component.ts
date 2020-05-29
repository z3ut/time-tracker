import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Project } from 'src/app/models/project';
import Pickr from '@simonwep/pickr/dist/pickr.min';
import { Store, Actions, ofActionDispatched } from '@ngxs/store';
import { CreateProject, CreateProjectError, CreateProjectSuccess } from 'src/app/store/actions/project';
import { ToasterService } from 'angular2-toaster';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.scss']
})
export class CreateNewProjectComponent implements OnInit, OnDestroy {

  private defaultColor = '#FF0000';
  private ngUnsubscribe = new Subject();

  name = '';
  color = this.defaultColor;
  isLoading = false;

  @ViewChild('colorPicker') colorPicker: ElementRef;

  @Output() created = new EventEmitter<Project>();
  @Output() canceled = new EventEmitter<Project>();

  constructor(private toasterService: ToasterService,
              private spinnerService: SpinnerService,
              private store: Store,
              private actions$: Actions) { }

  ngOnInit() {
    const pickr = Pickr.create({
      el: this.colorPicker.nativeElement,
      default: this.color,
      components: {
          preview: true,
          opacity: true,
          hue: true,
          interaction: {
              hex: true,
              rgba: true,
              hsla: true,
              hsva: true,
              cmyk: true,
              input: true,
              clear: true,
              save: true
          }
      }
    });

    pickr.on('save', hsvColorObject => {
      this.color = hsvColorObject.toHEX().toString();
    });

    this.actions$
      .pipe(
        ofActionDispatched(CreateProjectSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.resetForm();
        this.created.emit();
      });

    this.actions$
      .pipe(
        ofActionDispatched(CreateProjectError),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({ payload }) => {
        this.isLoading = false;
        this.spinnerService.hide();
        this.toasterService.pop('error', 'Error creating project');
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  create() {
    if (!this.name || !this.color) {
      this.toasterService.pop('warning', 'Enter project name and select color');
      return;
    }

    this.isLoading = true;
    this.spinnerService.show();

    const state = this.store.snapshot();

    this.store.dispatch(new CreateProject({
      name: this.name,
      color: this.color,
      userId: state.app.auth.user.id,
      workspaceId: state.app.workspaces.selectedWorkspaceId
    }));
  }

  cancel() {
    this.isLoading = false;
    this.spinnerService.hide();
    this.canceled.emit();
  }

  private resetForm() {
    this.name = '';
    this.color = this.defaultColor;
  }

}
