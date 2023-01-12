import { Component, Input, OnInit } from '@angular/core';
import { BaseBtnComponent } from '../base-btn-component';

@Component({
  selector: 'templatebuilder-btn-primary',
  template: `
  <button class={{componentClass}} (click)="click()">
    {{content}}
  </button>
  `,
  styleUrls: ['./btn-primary.component.scss'],
})
export class BtnPrimaryComponent extends BaseBtnComponent {
  override componentClass = "btn-primary"

  constructor() {
    super()
  }
}
