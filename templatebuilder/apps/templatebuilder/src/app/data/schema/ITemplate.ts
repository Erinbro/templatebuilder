import { Shape } from "konva/lib/Shape";
import { Stage } from 'konva/lib/Stage';

export interface ITemplate {
  id: string;
  title: string;
  /**
   * Serialized string
   */
  stageString: string,
  data: any[][]
}

// export interface IStageRectangleGroups {
//   groups {

// }

// }
