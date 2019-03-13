import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() isVisible: boolean;
  @Input() isShowControlButtons = false;
  @Output() ok = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeClick() {
    this.close.emit();
  }

  okClick() {
    this.ok.emit();
  }

}
