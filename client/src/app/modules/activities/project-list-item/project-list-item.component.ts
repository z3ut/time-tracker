import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent {

  @Input() name: string;
  @Input() color = '';
  @Input() isDeletable = false;
  @Input() isHighlightable = false;
  @Input() isFixedHeight = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();

  selectClick() {
    this.select.emit();
  }

  deleteClick() {
    this.delete.emit();
  }

}
