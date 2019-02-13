import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableActivityComponent } from './editable-activity.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SharedModule } from 'src/app/shared/shared.module';

describe('EditableActivityComponent', () => {
  let component: EditableActivityComponent;
  let fixture: ComponentFixture<EditableActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        SharedModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
      ],
      declarations: [ EditableActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
