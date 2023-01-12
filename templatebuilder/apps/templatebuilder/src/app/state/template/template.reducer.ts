import { createReducer, on } from '@ngrx/store';
import { ITemplate } from '../../data/schema/ITemplate';
import * as templateStoreActions from "./template.actions"

const templateFeatureName = 'template';

interface ITemplateStore {
  // NOTE The data from the csv file
  data: {
    [id: number]: ITemplate
  }
  loading: boolean,
  error: ''
}

const initialTemplateState: ITemplateStore = {
  data: {},
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
  on(templateStoreActions.LOAD_TEMPLATES_SUCCESS, (state, { data }) => {
    data.forEach((d, i) => {
      dataObject['i'] = d
    })

    return {
      ...state,
      data
    }
  })
)
