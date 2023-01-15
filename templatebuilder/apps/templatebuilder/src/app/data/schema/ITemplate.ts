import { Shape } from "konva/lib/Shape";
import { Stage } from 'konva/lib/Stage';

export interface ITemplate {
  id: string;
  title: string;
  rectangleGroups: RectangleGroup[]
  data: any[][] | undefined
}

export interface RectangleGroup {
  id: string;
  position: { x: number, y: number };
  /**
   * Decides if the rectangle has been already dragged.
   * This is important because we do not want to append
   * more callbacks to be appended on the RectangleGroup
   */
  dragged: boolean;
  text: string;
}

