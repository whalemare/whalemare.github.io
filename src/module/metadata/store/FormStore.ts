import chroma from 'chroma-js'
import { makeAutoObservable } from 'mobx'

import { TextStore } from '../../../lib/mobx/TextStore'
import { ValueStore } from '../../../lib/mobx/ValueStore'
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

  appName = new TextStore('')

  appNameMarket = new TextStore('')

  descriptionMarket = new TextStore('')

  primaryColor = new TextStore('#000', {
    validate: this.validateColor,
  })

  primaryInverseColor = new TextStore('#FFF', {
    validate: this.validateColor,
  })

  iconFile = new ValueStore<File | undefined>(undefined)

  splashFile = new ValueStore<File | undefined>(undefined)

  splashBackgroundColor = new TextStore('#000', {
    validate: this.validateColor,
  })

  onBlurAppName = () => {
    if (!this.appNameMarket.value) {
      this.appNameMarket.set((this.appName.value || '').trim())
    }
  }

  onPressRestoreDescription = () => {
    this.descriptionMarket.set(this.strings.marketDescriptionPlaceholder)
  }

  constructor(private strings: AppStrings) {
    makeAutoObservable(this)
  }
}
