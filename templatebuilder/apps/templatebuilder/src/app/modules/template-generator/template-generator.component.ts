import { CdkDrag, CdkDragEnd, CdkDragEnter, CdkDragStart, DragRef } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GeneratorUtils } from '../../utils/GeneratorUtils';
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';
import { Store } from '@ngrx/store';
import { ADD_TEMPLATE } from '../../state/template/template.actions';
import { ITemplate } from '../../data/schema/ITemplate';
import { templateStorage, TemplateStorage } from '../../storage/storage';
import { Stage } from 'konva/lib/Stage';

@Component({
  selector: 'templatebuilder-template-generator',
  templateUrl: './template-generator.component.html',
  styleUrls: ['./template-generator.component.scss'],
})
export class TemplateGeneratorComponent implements OnInit, OnDestroy {
  /**
   * A4 format
   */
  pageRatio = { width: 210, height: 297 }
  /**
   * Multiply this with the width when scalling
   */
  pageRatioWidth = 210 / 297
  /**
   * Multiply this with the height when scalling
   */
  pageRatioHeight = 297 / 210

  rectangles = new BehaviorSubject<{ [id: number]: Konva.Rect }>({})
  rectangleList = new BehaviorSubject<Konva.Rect[]>([])


  pageContainer!: HTMLDivElement
  konvaPage!: HTMLCanvasElement
  stage!: Konva.Stage;
  htmlRectangleTemplate!: HTMLDivElement


  constructor(private elementRef: ElementRef, private generatorUtils: GeneratorUtils, private store: Store, private templateStorage: TemplateStorage) { }


  ngOnInit(): void {

    /**
     * ANCHOR Save the parent of the canvas
     */
    this.pageContainer = this.elementRef.nativeElement.querySelector(".page__container")

    /**
     * ANCHOR STAGE CREATION
     */
    this.stage = new Konva.Stage({
      container: this.pageContainer,
      ...this.generatorUtils.getDimensionsForPage(this.pageContainer)
    })

    this.generatorUtils.drawTemplateRectangle(this.stage)
    this.generatorUtils.drawTemplateRectangleMove(this.stage)
    this.stage.draw()

    console.log(`stage: ${this.stage}`)

    /**
     * ANCHOR Save the template to the redux store.
     * With this the generatorUils service has also access to the stage
     */
    this.generatorUtils.saveTemplate(this.stage)

    /**
     * Save the canvas HTML refernce
     */
    this.konvaPage = this.elementRef.nativeElement.querySelector(".page__container canvas")

    console.log(`parent element: ${this.elementRef.nativeElement.getBoundingClientRect().width}`)


  }

  ngOnDestroy(): void {
    this.stage.destroy()
  }

  // ANCHOR Utility functions

  convertToPdf() {
    const canvasUrl = this.stage.toCanvas().toDataURL("image/png", 1)

    const doc = new jsPDF({
      orientation: "portrait",
      format: "a4",
      unit: "mm"
    })

    const width = doc.internal.pageSize.getWidth()
    const height = doc.internal.pageSize.getHeight()

    doc.addImage(canvasUrl, 'PNG', 0, 0, width, height)
    doc.save("jaime.pdf")
  }

  saveTemplate(stage: Stage) {
    this.generatorUtils.saveTemplate(stage)
  }

}
