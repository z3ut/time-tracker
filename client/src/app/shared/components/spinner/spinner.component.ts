import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  isVisible = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isVisible.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  ngOnInit() {
  }

}
