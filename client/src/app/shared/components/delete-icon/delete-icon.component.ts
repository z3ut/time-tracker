import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-icon',
  templateUrl: './delete-icon.component.html',
  styleUrls: ['./delete-icon.component.scss']
})
export class DeleteIconComponent implements OnInit {

  @Input() isDoubleClickRequired = false;
  @Input() doubleClickTimeoutMs = 3000;
  @Input() title = 'Delete';
  @Output() delete = new EventEmitter<void>();

  isClickedOnce = false;
  private doubleClickTimeout;

  constructor() { }

  ngOnInit() {
  }

  deleteClick() {
    if (this.isDoubleClickRequired && !this.isClickedOnce) {
      this.isClickedOnce = true;
      this.doubleClickTimeout = setTimeout(() => {
        this.isClickedOnce = false;
        this.doubleClickTimeout = null;
      }, this.doubleClickTimeoutMs);
      return;
    }

    if (this.doubleClickTimeout) {
      clearTimeout(this.doubleClickTimeout);
      this.doubleClickTimeout = null;
      this.isClickedOnce = false;
    }

    this.delete.emit();
  }
}
