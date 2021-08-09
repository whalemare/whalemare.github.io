import { makeAutoObservable } from 'mobx'

import { TextStore } from '../../../lib/mobx/TextStore'

export class FormStore {
  appName = new TextStore()

  appNameStore = new TextStore()

  onBlurAppName = () => {
    if (!this.appNameStore.value) {
      this.appNameStore.set(this.appName.value.trim())
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}
