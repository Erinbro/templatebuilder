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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GeneratorUtils } from './utils/GeneratorUtils';
import { StoreModule } from '@ngrx/store';
import { reducers } from './state/reducer';
import { environment } from '../environments/environment';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DataDialogComponent } from './modules/template-generator/components/DataDialog/data-dialog.component';
import { DataExtractorPageComponent } from './modules/data-extractor/data-extractor-page.component';
import { MatDialogModule } from "@angular/material/dialog"
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule, } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"

const materialModules = [MatDialogModule, MatFormFieldModule, MatInputModule]
const materialProviders = [{
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: 'always'
}]
const components = []

@NgModule({
  declarations: [
    AppComponent,
    TemplateListComponent,
    TemplateCardComponent,
    BtnSecondaryComponent,
    BtnPrimaryComponent,
    TemplateGeneratorComponent,
    DataDialogComponent,
    DataExtractorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateListModule,
    BrowserAnimationsModule,
    DragDropModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    materialModules
  ],
  providers: [materialProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
