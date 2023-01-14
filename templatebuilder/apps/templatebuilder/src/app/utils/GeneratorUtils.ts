import { Injectable, ElementRef, OnInit } from '@angular/core';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Rect, RectConfig } from 'konva/lib/shapes/Rect';
import { Text, TextConfig } from 'konva/lib/shapes/Text';
import { Store } from '@ngrx/store';
import { selectTemplate } from '../state/template/template.selectors';
import { ITemplateStore } from '../state/template/template.reducer';
import { Observable } from 'rxjs';
import { ITemplate } from '../data/schema/ITemplate';
import { Node } from 'konva/lib/Node';
import { ADD_TEMPLATE } from '../state/template/template.actions';
import { jsPDF } from 'jspdf';
import { Circle } from 'konva/lib/shapes/Circle';
import { Transformer } from 'konva/lib/shapes/Transformer';

@Injectable({
  providedIn: "root"
})
export class GeneratorUtils {

  template: ITemplate | undefined


  constructor(private store: Store<ITemplateStore>,) {

    // NOTE Subscribe to changes in the template
    // We rely on the stage which is stored in the store for the functionality of this class
    this.store.select(selectTemplate).subscribe((template) => {
      this.template = template
    })
  }

  // see: https://longviewcoder.com/2021/12/08/konva-a-better-grid/
  public drawGrid() {

  }

  public convertToPdf(stage: Stage) {

    const canvasUrl = stage.toCanvas().toDataURL("image/png", 1)

    const doc = new jsPDF({
      orientation: "portrait",
      format: "a4",
      unit: "mm"
    })

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    doc.addImage(canvasUrl, 'PNG', 0, 0, width, height)

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

  // FIXME Add proper data and title
  /**
   * Saves the template to the redux store
   * @param template
   */
  public saveTemplate(stage: Stage) {
    const groupList = stage.find('Group')
    console.log(`Group: ${JSON.stringify(groupList)}`)
    // store
  }





  // ANCHOR SETUP
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

  public drawTemplateRectangleMove(stage: Stage) {
    //  group
    const group = new Group({
      x: 0,
      y: 0,
      draggable: true
    })

    group.on("click", this.openDataDialog)

    const layer = new Layer()
    const transformer = new Transformer({
      rotateEnabled: false
    })
    layer.add(transformer)


    const text = new Text({
      fontFamily: "Arial",
      fontSize: 14,
      text: "",
      fill: "black",
      padding: 10,
      x: 0,
      y: 0
    })
    const rectangle = new Rect({
      x: 0,
      y: 0,
      height: 30,
      width: 150,
      stroke: "black",
      fill: "transparent"
    })

    const plusSignGroup = new Group()
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
      fontSize: 30
    })



    group.add(...[text, rectangle])

    group.on("mouseover", () => {
      document.body.style.cursor = "move"
    })
    group.on("mouseout", () => {
      document.body.style.cursor = "default"
    })

    group.on("dragend", (ev) => {
      plusSignGroup.add(...[plusSignText, plusSign])
      group.add(plusSignGroup)
      transformer.forceUpdate()
      this.drawTemplateRectangleMove(stage)
    })

    layer.add(group)
    transformer.nodes([group])
    stage.add(layer)
  }


  // ANCHOR Event Callbacks
  openDataDialog() {
    console.log("open data dialog")
  }
}
