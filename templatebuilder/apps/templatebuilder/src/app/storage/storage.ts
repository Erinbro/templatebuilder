import Dexie from "dexie";
import { ITemplate } from '../data/schema/ITemplate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class TemplateStorage extends Dexie {
  templates!: Dexie.Table<ITemplate, number>

  constructor() {
    super("ngdexieliveQuery")
    this.version(1).stores({
      templates: "id"
    })
  }
}

export const templateStorage = new TemplateStorage()
