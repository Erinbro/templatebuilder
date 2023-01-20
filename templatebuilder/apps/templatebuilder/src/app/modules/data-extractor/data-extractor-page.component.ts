import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTemplateData } from '../../state/template/template.selectors';
import { IGlobalState } from '../../state/reducer';
import { CsvParser } from '../../utils/CsvParser';
import { SelectionModel } from '@angular/cdk/collections';
import { ADD_TEMPLATE_DATA } from '../../state/template/template.actions';

@Component({
  selector: 'templatebuilder-data-extractor-page',
  templateUrl: './data-extractor-page.component.html',
  styleUrls: ['./data-extractor-page.component.scss'],
})
export class DataExtractorPageComponent implements OnInit {
  data!: { columns: string[], data: any[] }
  /**
   * Title of the template
   */
  title = ""
  constructor(private store: Store<IGlobalState>, private parser: CsvParser) { }

  ngOnInit(): void {
    this.store.select(selectTemplateData).subscribe((data) => {
      if (!data) return
      this.data = data;
    })
  }

  parseData() {
    // @ts-ignore
    const file = document.querySelector("#file").files[0] as File

    if (typeof file.name === "string") {
      this.title = file.name;
    }

    /**
     * Parses the file and sends data to store
     */
    this.parser.parseCsv(file)
  }

  changeTitle(e: Event) {
    // @ts-ignore
    const newTitle = e.target.value
    console.log(`[DataExtractorComponent.changeTitle()] new title: ${newTitle}`);
  }



}

