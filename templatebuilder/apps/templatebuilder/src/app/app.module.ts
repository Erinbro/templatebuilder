import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateListComponent } from './modules/template-list/template-list.component';
import { TemplateListModule } from './modules/template-list/template-list.module';
import { TemplateCardComponent } from './shared/template-card/template-card.component';
import { BtnSecondaryComponent } from './shared/buttons/button-secondary/btn-secondary.component';
import { BtnPrimaryComponent } from './shared/buttons/button-primary/btn-primary.component';
import { AppRoutingModule } from './app-routing.module';
import { TemplateGeneratorComponent } from './modules/template-generator/template-generator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop"

@NgModule({
  declarations: [
    AppComponent,
    TemplateListComponent,
    TemplateCardComponent,
    BtnSecondaryComponent,
    BtnPrimaryComponent,
    TemplateGeneratorComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, TemplateListModule, BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
