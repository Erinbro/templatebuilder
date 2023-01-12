import { Component, Input, OnInit } from '@angular/core';
import { BaseBtnComponent } from '../base-btn-component';

@Component({
  selector: 'templatebuilder-btn-secondary',
  template: `
  <button class="btn {{componentClass}}" (click)="click()">
    {{content}}
  </button>
  `,
  styleUrls: ['./btn-secondary.component.scss'],
})
export class BtnSecondaryComponent extends BaseBtnComponent {

  override componentClass = "btn-secondary"

  constructor() {
    super()
  }
}
