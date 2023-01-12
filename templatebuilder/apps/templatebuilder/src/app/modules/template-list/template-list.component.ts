import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'templatebuilder-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
})
export class TemplateListComponent {
  addBtnContent = "Add Template"

  constructor(private router: Router) {

  }

  navigateToGenerate() {
    this.router.navigate(["generate"])
  }
}
