import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'templatebuilder-data-dialog',
  templateUrl: './data-dialog.component.html',
  styleUrls: ['./data-dialog.component.scss'],
})
export class DataDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { text: string }, public dialogRef: MatDialogRef<DataDialogComponent>) { }

  ngOnInit(): void { }

  changeText(ev: Event) {
    // @ts-ignore
    this.data.text = ev.target.value
  }

  closeDialog() {
    this.dialogRef.close(this.data)
  }
}
