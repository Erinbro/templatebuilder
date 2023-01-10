import { Component, Input, OnInit } from '@angular/core';
import { ITemplate } from '../../data/schema/ITemplate';

@Component({
  selector: 'templatebuilder-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss'],
})
export class TemplateCardComponent implements OnInit {

  @Input()
  template!: ITemplate;

  constructor() { }

  ngOnInit(): void { }
}
