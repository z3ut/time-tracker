import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityManualComponent } from './create-activity-manual.component';

describe('CreateActivityManualComponent', () => {
  let component: CreateActivityManualComponent;
  let fixture: ComponentFixture<CreateActivityManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
