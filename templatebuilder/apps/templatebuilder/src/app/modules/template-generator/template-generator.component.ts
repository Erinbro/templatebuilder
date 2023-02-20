import { Component, ElementRef, OnDestroy, OnInit, } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject, } from 'rxjs';
import { GeneratorUtils } from '../../utils/GeneratorUtils';
import { jsPDF } from "jspdf"
import { Store } from '@ngrx/store';
import { MatDialog, } from "@angular/material/dialog"
import { DataDialogComponent } from './components/DataDialog/data-dialog.component';
import { Stage } from 'konva/lib/Stage';
import { IRectangleGroup, ITemplate } from '../../data/schema/ITemplate';
import { selectTemplate } from '../../state/template/template.selectors';
import { IGlobalState } from '../../state/reducer';


@Component({
  selector: 'templatebuilder-template-generator',
  templateUrl: './template-generator.component.html',
  styleUrls: ['./template-generator.component.scss'],
})
export class TemplateGeneratorComponent implements OnInit, OnDestroy {

  rectangleGroups = new BehaviorSubject<IRectangleGroup[]>([])
  template!: ITemplate

  pageContainer!: HTMLDivElement
  konvaPage!: HTMLCanvasElement
  stage!: Konva.Stage;
  htmlRectangleTemplate!: HTMLDivElement


  constructor(private elementRef: ElementRef, private generatorUtils: GeneratorUtils, private store: Store<IGlobalState>, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.generatorUtils.setDataDialog(this.dialog)

    this.store.select(selectTemplate).subscribe((template) => {
      if (!template) return
      this.template = template
    })

    /**
     * ANCHOR Save the parent of the canvas
     */
    this.pageContainer = this.elementRef.nativeElement.querySelector(".page__container")

    /**
     * ANCHOR STAGE CREATION
     */
    this.stage = new Konva.Stage({
      container: this.pageContainer,
      width: this.pageContainer.getBoundingClientRect().width,
      height: this.pageContainer.getBoundingClientRect().height,
      // ...this.generatorUtils.getDimensionsForPage(this.pageContainer)
    })

    // share stage
    this.generatorUtils.setStage(this.stage)

    this.generatorUtils.setup();

    /**
     * Save the canvas HTML refernce
     */
    this.konvaPage = this.elementRef.nativeElement.querySelector(".page__container canvas")
  }

  ngOnDestroy(): void {
    this.stage.destroy()
  }

  // ANCHOR Utility functions

  convertToPdf() {
    this.generatorUtils.convertToPdf()
    // const canvasUrl = this.stage.toCanvas().toDataURL("image/png", 1)

    // const doc = new jsPDF({
    //   orientation: "portrait",
    //   format: "a4",
    //   unit: "mm"
    // })

    // const width = doc.internal.pageSize.getWidth()
    // const height = doc.internal.pageSize.getHeight()

    // doc.addImage(canvasUrl, 'PNG', 0, 0, width, height)
    // doc.save("output.pdf")
  }

}
