import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-icon',
  templateUrl: './delete-icon.component.html',
  styleUrls: ['./delete-icon.component.scss']
})
export class DeleteIconComponent implements OnDestroy {

  @Input() isDoubleClickRequired = false;
  @Input() doubleClickTimeoutMs = 3000;
  @Output() delete = new EventEmitter<void>();

  isClickedOnce = false;
  private doubleClickTimeout;
  private deleteTitle = 'Delete';
  private confirmationTitle = 'Are you sure?';

  get title() {
    return this.isClickedOnce ? this.confirmationTitle : this.deleteTitle;
  }

  ngOnDestroy(): void {
    if (this.doubleClickTimeout) {
      clearTimeout(this.doubleClickTimeout);
    }
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
