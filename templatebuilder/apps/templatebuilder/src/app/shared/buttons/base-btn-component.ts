import { Input, Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'templatebuilder-base-component',
  template: `
  <button class="btn {{ componentClass}}"(click)="click()")>
   {{content}}
  </button>
  `,
  styleUrls: ["./base-btn-component.scss"]
})
export class BaseBtnComponent {
  @Input() content!: string;
  @Input() componentClass!: string;
  @Output() clicked = new EventEmitter<boolean>();

  public click() {
    this.clicked.emit(true);
  }
}
