import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeIntervalPipe } from './pipes/time-interval.pipe';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { TimeAmountComponent } from './components/time-amount/time-amount.component';
import { SecondsToTimeFormatService } from './services/seconds-to-time-format.service';
import { PopupComponent } from './components/popup/popup.component';

@NgModule({
  declarations: [
    TimeIntervalPipe,
    TimeAmountComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule
  ],
  exports: [
    TimeIntervalPipe,
    TimeAmountComponent,
    PopupComponent
  ],
  providers: [
    SecondsToTimeFormatService
  ]
})
export class SharedModule { }
