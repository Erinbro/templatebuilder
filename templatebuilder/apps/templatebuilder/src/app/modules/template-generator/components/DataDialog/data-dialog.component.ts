import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { selectTemplateData } from '../../../../state/template/template.selectors';
import { IGlobalState } from '../../../../state/reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'templatebuilder-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.scss'],
})
export class DataDialogComponent implements OnInit {
  templateData!: { columns: string[], data: any[] };
  /**
   * Decides if we have the template data
   */
  templateDataGiven = false
  selection = new SelectionModel<string[]>(false,)
  @ViewChild("dataDialog") dataDialog!: MatDialog


  constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string }, public dialogRef: MatDialogRef<DataDialogComponent>, private store: Store<IGlobalState>, private router: Router,) { }

  ngOnInit(): void {
    this.store.select(selectTemplateData).subscribe((data) => {
      if (!data) return
      this.templateDataGiven = true
      this.templateData = data;
    })

  }

  changeSelection(ev: Event) {
    // @ts-ignore
    this.data.selection = ev.target.value
  }

  closeDialog() {
    this.dialogRef.close(this.data)
  }

  columnSelected(e: any) {
    console.log(`[DataExtractorComponent] column selected: ${e}`);
  }

  redirectToDataExtrator() {
    this.closeDialog()
    this.router.navigate(["/extract"])
  }
}
