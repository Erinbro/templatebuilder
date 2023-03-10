import { Injectable, ElementRef, OnInit } from '@angular/core';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Rect, RectConfig } from 'konva/lib/shapes/Rect';
import { Text, TextConfig } from 'konva/lib/shapes/Text';
import { Store } from '@ngrx/store';
import { selectTemplate } from '../state/template/template.selectors';
import { ITemplateStore } from '../state/template/template.reducer';
import { ITemplate, IRectangleGroup } from '../data/schema/ITemplate';
import { Node } from 'konva/lib/Node';
import { jsPDF } from 'jspdf';
import { Circle } from 'konva/lib/shapes/Circle';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { nanoid } from 'nanoid';
import { MatDialog } from '@angular/material/dialog';
import { UPDATE_RECTANGLEGROUP } from '../state/template/template.actions';
import { DataDialogComponent } from '../modules/template-generator/components/DataDialog/data-dialog.component';

@Injectable({
  providedIn: "root"
})
export class GeneratorUtils {

  stage!: Stage
  template: ITemplate | undefined
  rectangleGroups: IRectangleGroup[] = []
  selectedRectangleGroupId: string | undefined = undefined
  dataDialog!: MatDialog


  constructor(private store: Store<ITemplateStore>) {

    // NOTE Subscribe to changes in the template
    // We rely on the stage which is stored in the store for the functionality of this class
    this.store.select(selectTemplate).subscribe((template) => {
      this.template = template
    })

  }

  public setStage(stage: Stage) {
    this.stage = stage;
  }

  public setDataDialog(dataDialog: MatDialog) {
    this.dataDialog = dataDialog
  }

  // see: https://longviewcoder.com/2021/12/08/konva-a-better-grid/
  public drawGrid() {

  }

  public convertToPdf() {

    // const canvasUrl = this.stage.toCanvas().toDataURL("image/png", 1)

    // const doc = new jsPDF({
    //   orientation: "portrait",
    //   format: "a4",
    //   unit: "mm",
    // })

    const doc = new jsPDF("p", "pt", [595.28, 841.89])

    for (let i = 0; i < this.rectangleGroups.length; i++) {
      const r = this.rectangleGroups[i];

      console.log(`convertToPdf: ${r.position.x}, ${r.position.y}`);
      // doc.html()

      doc.text(r.text, r.position.x, r.position.y)
    }


    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // doc.addImage(canvasUrl, 'PNG', 0, 0, width, height)

    doc.save("template")

    // TODO remove rectangles
  }

  public removeRectangles(stage: Stage) {
  }

  public reconstructStage(stageString: string, container: string) {
    // Deserialize stage with new stage
    Node.create(stageString, container)
  }

  /**
   * Creates the page proportionally to the A4 format
   * @param dimensions
   */
  public getDimensionsForPage(elem: HTMLDivElement) {
    const { parentWidth, parentHeight } = this.getParentWidthHeight(elem)

    const A4_WIDTH = 210
    const A4_HEIGHT = 297

    console.log("width before: ", parentWidth)
    console.log("height before: ", parentHeight)

    let width = Math.floor(parentWidth / 210)
    width = 210 * width
    let height = Math.floor(parentHeight / 297)
    height = height * 297

    console.log("width after: ", width)
    console.log("height after: ", height)

    return { width, height }
  }

  /**
   * Gets the width and height of an HTMLElement
   * @param elem
   * @returns
   */
  private getParentWidthHeight(elem: HTMLDivElement): { parentWidth: number, parentHeight: number } {
    const parentWidth = elem.getBoundingClientRect().width
    const parentHeight = elem.getBoundingClientRect().height

    return { parentWidth, parentHeight }
  }


  /**
   * The template rectangle is the static rectangle that
   * always gets dragged.
   * @param stage
   */
  public drawTemplateRectangle(stage: Stage) {
    const layer = new Layer()
    const rectangle = new Rect({
      x: 0,
      y: 0,
      width: 150,
      height: 30,
      fill: "transparent",
      stroke: "black",
      strokeWidth: 2,
      draggable: false
    })

    layer.add(rectangle)

    stage.add(layer)
  }

  /**
   * The dynamic rectangle with event listeners.
   * If we are given a list of rectangleGroups then we populate the stage with it
   * @param rectangleGroup
   */
  public drawTemplateRectangleMove(rectangleGroups?: IRectangleGroup[]) {


    const groupId = nanoid()
    const group = new Group({
      x: 0,
      y: 0,
      draggable: true,
      id: groupId
    })


    const layer = new Layer()
    const transformer = new Transformer({
      rotateEnabled: false
    })
    layer.add(transformer)


    const textId = nanoid()

    const text = new Text({
      fontFamily: "Arial",
      fontSize: 14,
      text: "",
      fill: "black",
      padding: 10,
      x: 0,
      y: 0,
      id: textId

    })
    const rectangle = new Rect({
      x: 0,
      y: 0,
      height: 30,
      width: 150,
      stroke: "black",
      fill: "transparent"
    })

    const plusSignGroupId = nanoid()

    const plusSignGroup = new Group({
      id: plusSignGroupId
    })
    const plusSignRadius = rectangle.height() / 2
    const plusSignX = rectangle.width() / 2
    const plusSignY = rectangle.height() / 2
    const plusSign = new Circle({
      x: plusSignX, y: plusSignY, radius: plusSignRadius, fill: "blue"
    })

    const plusSignText = new Text({
      text: "+",
      fill: "white",
      fontStyle: "bold",
      x: (plusSign.position().x - 8), y: (plusSign.position().y - 10),
      fontSize: 30,
    })

    group.add(...[text, rectangle])

    group.on("mouseover", () => {
      document.body.style.cursor = "move"
    })
    group.on("mouseout", () => {
      document.body.style.cursor = "default"
    })

    group.on("dragmove", (ev) => {
      this.selectedRectangleGroupId = ev.currentTarget.id();
      this.updateRectangleGroupPosition(ev.currentTarget)
      this.limitRectangleGroup(ev.currentTarget)
    })

    group.on("transform", (ev) => {


      // TODO do
      // this.resizeRectangle
    })

    group.on("dragend", (ev) => {

      /**
       * Decides if we have already saved the rectangle
       */
      const rectangleAlreadySaved = this.rectangleGroups.find((g) => g.id === ev.target.id())

      // NOTE If we have already the group saved then we do not add the setup!!!
      if (rectangleAlreadySaved) {
        const { x, y } = ev.target.position()

        const currentRectangle = { ...this.rectangleGroups.find((r) => r.id === ev.target.id()) } as IRectangleGroup

        currentRectangle.position.x = x;
        currentRectangle.position.y = y;

        // Update locally
        this.updateRectangleGroupPosition(currentRectangle)

        // Update the position and persist it in the store
        this.store.dispatch(UPDATE_RECTANGLEGROUP({ updatedRectangleGroup: currentRectangle }))

        return;
      }

      /**
       * START SETUP ON DRAGEND
       */

      transformer.nodes([group])

      const x = ev.target.x()
      const y = ev.target.y()
      const id = ev.target.id()

      // Gather all essential information
      const rectangleGroup = { position: { x, y }, id, text: "", dragged: false, textId, plusSignGroupId, plusSignRemoved: false }
      // NOTE Add to rectangleGroups to track it
      this.rectangleGroups.push(rectangleGroup)

      group.on("click", (ev) => {
        this.selectedRectangleGroupId = ev.currentTarget.id()
        this.openDataDialog()
      })

      plusSignGroup.add(plusSignText, plusSign)

      group.add(plusSignGroup)

      // Add a new rectangle that can be moved
      this.drawTemplateRectangleMove()
      this.selectedRectangleGroupId = undefined
    })

    layer.add(group)
    this.stage.add(layer)
  }

  private updateRectangleGroupPosition(movedRectangleGroup: any) {
    const selectedRectangleGroupIndex = this.rectangleGroups.findIndex((r) => r.id === movedRectangleGroup)

    this.rectangleGroups[selectedRectangleGroupIndex] = movedRectangleGroup

  }

  private limitRectangleGroup(rectangleGroup: any) {

    console.log(`limit`);

    const widthLimit = this.stage.width()
    const heightLimit = this.stage.height()

    const rectangleInGroup = rectangleGroup.find((n: any) => n.className === "Rect")[0]

    const rectangleGroupWidth = rectangleInGroup.width()
    const rectangleGroupHeight = rectangleInGroup.height()

    const { x, y } = rectangleGroup.position()



    if (widthLimit < x + rectangleGroupWidth) {
      rectangleGroup.x(widthLimit - rectangleGroupWidth)
    }
    if (x < 0) {
      rectangleGroup.x(0)
    }
    if (y + rectangleGroupHeight > heightLimit) {
      rectangleGroup.y(y - rectangleGroupHeight)
    }
    if (y < 0) {
      rectangleGroup.y(0)
    }
  }

  findText(stage: Stage): Text {
    if (!this.selectedRectangleGroupId) throw Error("[GeneratorUtils.findText()] No group selected")

    const selectedRectangleGroup = this.rectangleGroups.find((r) => r.id === this.selectedRectangleGroupId) as IRectangleGroup


    const selectedText = stage.find((s: any) => {
      return s.id() === selectedRectangleGroup.textId
    })

    return selectedText[0] as Text
  }

  private resizeRectangle() {

  }

  addText(stage: Stage, text: string): void {
    // NOTE RectangleGroup is the layer
    const selectedLayer = this.rectangleGroups.find((r) => r.id)
    if (!selectedLayer) throw Error(`No rectangleGroup selected!`)
    const textShape = this.findText(stage)
    textShape.text(text)

    // update state
    const selectedRectangleGroup = this.getSelectedRectangleGroup() as IRectangleGroup
    selectedRectangleGroup.text = text
    this.updateRectangleGroups(selectedRectangleGroup)

    // remove plusSign
    this.removePlusSign(stage)
  }

  removePlusSign(stage: Stage) {
    const selectedRectangleGroup = this.getSelectedRectangleGroup()
    if (!selectedRectangleGroup) throw Error("[GeneratorUtils.removePlusSign] No selectedRectangleGroup!")

    if (selectedRectangleGroup.plusSignRemoved) return
    selectedRectangleGroup.plusSignRemoved = true


    const plusSignGroupId = selectedRectangleGroup.plusSignGroupId

    this.destroyElementInStage(stage, plusSignGroupId)
  }


  getSelectedRectangleGroup() {
    return this.rectangleGroups.find((r) => r.id === this.selectedRectangleGroupId)
  }

  updateRectangleGroups(updatedRectangleGroup: IRectangleGroup) {
    const id = this.rectangleGroups.findIndex((r) => r.id === updatedRectangleGroup.id)
    this.rectangleGroups[id] = updatedRectangleGroup
  }

  private destroyElementInStage(stage: Stage, id: string) {
    const elementToDestroy = this.stage.find((e: any) => {
      return e.id() === id
    })
    elementToDestroy[0].destroy();
  }

  getElementInStageById(id: string) {
    return this.stage.find((n: any) => {
      return n.id() === id
    })
  }

  /**
   * Populates the stage with the rectangles.
   * The function is called when the generator page is loaded by the
   * TemplateGeneratorComponent.
   * We have two options:
   *
   * 1) The user loads the stage for the first time. We ascertain this
   * by checking if we have data in template.rectangleGroups in the store
   * 2) The user already has moved rectangles.
   */
  setup() {
    if (!this.template) return


    /**
     * If it is the first time we visit the stage
     */
    if (this.template.rectangleGroups.length === 0) {
      this.drawTemplateRectangle(this.stage)
      this.drawTemplateRectangleMove()
      this.stage.draw()
    }

    /**
     * If we already have moved rectangles
     */
    else {
      const rectangleGroups = this.template.rectangleGroups;

      rectangleGroups.forEach((r) => {
        this.drawTemplateRectangleMove()
      })
    }

  }

  openDataDialog() {
    this.dataDialog.open(DataDialogComponent,
      { disableClose: true, data: { text: "" }, height: "100%", width: "100%", maxWidth: "100vw", maxHeight: "100vh", panelClass: "full-screen-modal" }
    ).afterClosed()
      .subscribe((result) => {
        this.addTextToRect(result.text)
      })
  }

  addTextToRect(text: string) {
    this.addText(this.stage, text)
  }
}
