import { createAction, props } from "@ngrx/store";

// NOTE The string is the key
export const LOAD_TEMPLATES = createAction('[Template List] Load Templates');

export const LOAD_TEMPLATES_SUCCESS = createAction('[Template List] Load Templates success', props<{ data: string[][] }>())

export const LOAD_TEMPLATES_FAILURE = createAction('[Template List] Load Templates failure')

export const SELECT_TEMPLATE = createAction('[Template List] Select Template')

export const ADD_TEMPLATE = createAction('[Template list] Add Template')

export const UPDATE_TEMPLATE = createAction('[Template Generator] Update Template')
