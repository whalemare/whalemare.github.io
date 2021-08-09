import chroma from 'chroma-js'
import { makeAutoObservable } from 'mobx'

import { TextStore } from '../../../lib/mobx/TextStore'
import { AppStrings } from '../../locale/useStrings'

export class FormStore {
  private validateColor = (it: string | undefined) => {
    try {
      chroma(it || '').hex()
    } catch (e) {
      return this.strings.errorShouldBeColor
    }

    return undefined
  }

  appName = new TextStore()

  appNameMarket = new TextStore()

  descriptionMarket = new TextStore()

  primaryColor = new TextStore('', {
    validate: this.validateColor,
  })

  primaryInverseColor = new TextStore('', {
    validate: this.validateColor,
  })

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
