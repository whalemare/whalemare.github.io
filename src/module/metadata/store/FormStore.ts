import { makeAutoObservable } from 'mobx'

import { TextStore } from '../../../lib/mobx/TextStore'
import { AppStrings } from '../../locale/useStrings'

export class FormStore {
  appName = new TextStore()

  appNameMarket = new TextStore()

  descriptionMarket = new TextStore()

  onBlurAppName = () => {
    if (!this.appNameMarket.value) {
      this.appNameMarket.set(this.appName.value.trim())
    }
  }

  onPressRestoreDescription = () => {
    this.descriptionMarket.set(this.strings.marketDescriptionPlaceholder)
  }

  constructor(private strings: AppStrings) {
    makeAutoObservable(this)
  }
}
