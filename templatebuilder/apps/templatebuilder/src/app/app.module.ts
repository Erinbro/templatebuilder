import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateListComponent } from './modules/template-list/template-list.component';
import { TemplateListModule } from './modules/template-list/template-list.module';
import { TemplateCardComponent } from './components/template-card/template-card.component';

@NgModule({
  declarations: [AppComponent, TemplateListComponent, TemplateCardComponent],
  imports: [BrowserModule, TemplateListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
