import { createReducer, on } from '@ngrx/store';
import { ITemplate } from '../../data/schema/ITemplate';
import * as templateStoreActions from "./template.actions"

export const templateFeatureName = 'template';

export interface ITemplateStore {
  // NOTE The data from the csv file
  template?: ITemplate
  loading: boolean,
  error: ''
}

const initialTemplateState: ITemplateStore = {
  template: undefined,
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
)
