import { createReducer, on } from '@ngrx/store';
import { ITemplate } from '../../data/schema/ITemplate';
import * as templateStoreActions from "./template.actions"
import { IGlobalState } from '../reducer';

export const templateFeatureName = 'template';

export interface ITemplateStore {
  // NOTE The data from the csv file
  template: ITemplate
  loading: boolean,
  error: ''
}

const initialTemplateState: ITemplateStore = {
  template: { data: undefined, id: "", title: "", rectangleGroups: [] },
  loading: false,
  error: ''
}

export const templateReducer = createReducer(
  initialTemplateState,
  on(templateStoreActions.LOAD_TEMPLATES, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(templateStoreActions.LOAD_TEMPLATES_SUCCESS, (state, { template }) => {
    const stateCopy = JSON.parse(JSON.stringify(state)) as ITemplateStore
    stateCopy.template = template

    return stateCopy
  }),
  on(templateStoreActions.ADD_TEMPLATE_DATA, (state, { data }) => {
    const stateCopy = JSON.parse(JSON.stringify(state)) as ITemplateStore

    if (stateCopy.template) {
      stateCopy.template.data = data
    }

    return stateCopy
  }),
  on(templateStoreActions.ADD_TEMPLATE, (state, { template }) => {
    const stateCopy = JSON.parse(JSON.stringify(state)) as ITemplateStore

    if (!stateCopy.template) {
      stateCopy.template = template
    }

    return stateCopy
  }),
  on(templateStoreActions.UPDATE_RECTANGLEGROUP, (state, { updatedRectangleGroup }) => {
    const storeCopy = JSON.parse(JSON.stringify(state)) as ITemplateStore
    const id = storeCopy.template.rectangleGroups.findIndex((r) => r.id === updatedRectangleGroup.id)
    storeCopy.template.rectangleGroups[id] = updatedRectangleGroup
    return storeCopy;
  })
)
