import { createAction, props } from "@ngrx/store";
import { ITemplate, IRectangleGroup } from '../../data/schema/ITemplate';

// NOTE The string is the key
export const LOAD_TEMPLATES = createAction('[Template List] Load Templates');

export const LOAD_TEMPLATES_SUCCESS = createAction('[Template List] Load Templates success', props<{ template: ITemplate }>())

export const LOAD_TEMPLATES_FAILURE = createAction('[Template List] Load Templates failure')

export const SELECT_TEMPLATE = createAction('[Template List] Select Template')

export const ADD_TEMPLATE = createAction('[Template list] Add Template', props<{ template: ITemplate }>())

export const ADD_TEMPLATE_DATA = createAction('[Template list data] Add Template Data', props<{ data: { columns: string[], data: any[] } }>())

export const UPDATE_TEMPLATE = createAction('[Template Generator] Update Template', props<{ updatedTemplate: ITemplate }>())

export const UPDATE_RECTANGLEGROUP = createAction('[Shape] Update position', props<{ updatedRectangleGroup: IRectangleGroup }>())

