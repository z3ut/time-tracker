import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeIntervalPipe } from './pipes/time-interval.pipe';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TimeAmountComponent } from './components/time-amount/time-amount.component';
import { SecondsToTimeFormatService } from './services/seconds-to-time-format.service';
import { PopupComponent } from './components/popup/popup.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerService } from './components/spinner/spinner.service';
import { DeleteIconComponent } from './components/delete-icon/delete-icon.component';

@NgModule({
  declarations: [
    TimeIntervalPipe,
    TimeAmountComponent,
    PopupComponent,
    SpinnerComponent,
    DeleteIconComponent
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule
  ],
  exports: [
    TimeIntervalPipe,
    TimeAmountComponent,
    PopupComponent,
    SpinnerComponent,
    DeleteIconComponent
  ],
  providers: [
    SecondsToTimeFormatService,
    SpinnerService
  ]
})
export class SharedModule { }
