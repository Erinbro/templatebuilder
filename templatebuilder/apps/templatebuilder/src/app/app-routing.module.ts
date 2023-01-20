import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './modules/template-list/template-list.component';
import { NgModule } from '@angular/core';
import { TemplateGeneratorComponent } from './modules/template-generator/template-generator.component';
import { DataExtractorPageComponent } from './modules/data-extractor/data-extractor-page.component';

const routes: Routes = [
  { path: '', component: TemplateListComponent },
  { path: 'generate', component: TemplateGeneratorComponent },
  { path: "extract", component: DataExtractorPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  // {path: 'generate', }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
