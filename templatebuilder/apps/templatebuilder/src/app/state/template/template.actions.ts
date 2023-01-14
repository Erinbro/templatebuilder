import { createAction, props } from "@ngrx/store";
import { ITemplate } from '../../data/schema/ITemplate';

// NOTE The string is the key
export const LOAD_TEMPLATES = createAction('[Template List] Load Templates');

export const LOAD_TEMPLATES_SUCCESS = createAction('[Template List] Load Templates success', props<{ template: ITemplate | undefined }>())

export const LOAD_TEMPLATES_FAILURE = createAction('[Template List] Load Templates failure')

export const SELECT_TEMPLATE = createAction('[Template List] Select Template')

export const ADD_TEMPLATE = createAction('[Template list] Add Template', props<{ template: ITemplate }>())

export const ADD_TEMPLATE_DATA = createAction('[Template list data] Add Template Data', props<{ data: string[][] }>())

export const UPDATE_TEMPLATE = createAction('[Template Generator] Update Template')

// export const UPDATE_RECTANGLEGROUPS_POSITION = createAction('[Shape] Update position', props<>())

export const OPEN_DATA_DIALOG = createAction('[Data Dialog] Open Data Dialog')
