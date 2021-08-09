import { makeAutoObservable } from 'mobx'

import { TextStore } from '../../../lib/mobx/TextStore'

export class FormStore {
  appName = new TextStore()

  constructor() {
    makeAutoObservable(this)
  }
}
