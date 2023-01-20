import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITemplateStore, templateFeatureName } from './template.reducer';

const selectTemplateStore = createFeatureSelector<ITemplateStore>(templateFeatureName)

export const selectTemplate = createSelector(selectTemplateStore, (state) => {
  return state.template
})
export const selectTemplateData = createSelector(selectTemplateStore, (state) => {
  return state.template.data
})
