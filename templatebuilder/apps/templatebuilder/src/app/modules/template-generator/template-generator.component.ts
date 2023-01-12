import { DragRef } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Application, Graphics, Text } from 'pixi.js';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'templatebuilder-template-generator',
  templateUrl: './template-generator.component.html',
  styleUrls: ['./template-generator.component.scss'],
})
export class TemplateGeneratorComponent implements OnInit, OnDestroy {
  public app!: Application;
  mouseX: number | undefined;
  mouseY: number | undefined;
  rectangles = new BehaviorSubject<{ [id: number]: Graphics }>({})
  rectangleRef!: DragRef
  page!: ElementRef


  constructor(private elementRef: ElementRef) { }


  ngOnInit(): void {
    this.app = new Application({ backgroundColor: "white", });
    console.log("div: ", this.elementRef.nativeElement.querySelector('.template-generator__page'))
    this.page = this.elementRef.nativeElement.querySelector(".template-generator__page")
    this.elementRef.nativeElement.querySelector(".template-generator__page").appendChild(this.app.view)

    this.init()
    this.drawRectangle()
    this.insertText(this.rectangles.getValue()[0])
  }

  init() {
    this.app.renderer.resize(200 * window.devicePixelRatio, 300 * window.devicePixelRatio)
  }

  drawRectangle() {
    const graphics = new Graphics()
    graphics.beginFill(0xffffff)
    graphics.lineStyle(5, 0x000000)
    graphics.fill.visible = false

    graphics.drawRect(0, 0, 200, 100)

    this.app.stage.addChild(graphics)
    // NOTE Add to state
    this.addRectangles(graphics)
  }

  drawingRectangle() {
    console.log(`start drawing rectangle `)
    const graphics = new Graphics()
    graphics.beginFill(0xffffff)
    graphics.lineStyle(5, 0x000000)
    graphics.fill.visible = false
    graphics.drawRect(0, 0, 200, 100)
  }

  insertText(graphic: Graphics) {
    const text = new Text("Jaime is an excellent programmer", {
      fontFamily: "Arial",
      fontSize: 33,
      fill: 0x000000,
      align: "center"
    })
    this.app.stage.addChild(text)
  }

  changePosition(e: any) {
    const elem = e.source.getRootElement();
    console.log(`position: ${this.getPosition(elem).x}`)
    console.log("dragged")
    console.log(`page: ${this.page.nativeElement}`)
  }

  getPosition(div: HTMLDivElement): { x: number, y: number } {
    return { x: div.getBoundingClientRect().x, y: div.getBoundingClientRect().y }
  }

  addRectangles(newRectangle: Graphics): void {
    const before = this.rectangles.getValue()
    // get id
    const newId = Object.keys(before).length + 1;
    before[newId] = newRectangle
  }

  ngOnDestroy(): void {
    this.app.destroy()
  }

}
