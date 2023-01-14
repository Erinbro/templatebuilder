import { ITemplate } from '../data/schema/ITemplate';
import { Shape } from 'konva/lib/Shape';
import { templateReducer, ITemplateStore } from './template/template.reducer';
import { ActionReducerMap } from '@ngrx/store';

// TODO Implement IStoreEntity


interface IGlobalState {
  template: ITemplateStore,
}

export const reducers: ActionReducerMap<IGlobalState> = {
  template: templateReducer
}
