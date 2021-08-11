/* eslint-disable no-useless-escape */
import chroma from 'chroma-js'
import { makeAutoObservable } from 'mobx'

import { TextStore } from '../../../lib/mobx/TextStore'
import { ValueStore } from '../../../lib/mobx/ValueStore'
import { AppStrings } from '../../locale/useStrings'

export class FormStore {
  private validators = {
    color: (it: string | undefined) => {
      try {
        chroma(it || '').hex()
      } catch (e) {
        return this.strings.errorShouldBeColor
      }

      return undefined
    },

    notEmpty: (it: string | undefined) => {
      if (!it?.length) {
        return this.strings.errorNotEmpty
      }

      return undefined
    },

    email: (it: string | undefined) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (it && re.test(it)) {
        return undefined
      }
      return this.strings.errorEmail
    },

    isLink: (it: string | undefined) => {
      const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      if (it && re.test(it)) {
        return undefined
      }
      return this.strings.errorClubLint
    },
  }

  appName = new TextStore('', {
    validate: this.validators.notEmpty,
  })

  appNameMarket = new TextStore('', {
    validate: this.validators.notEmpty,
  })

  descriptionMarket = new TextStore('')

  primaryColor = new TextStore('#000', {
    validate: this.validators.notEmpty,
  })

  primaryInverseColor = new TextStore('#FFF', {
    validate: this.validators.notEmpty,
  })

  iconFile = new ValueStore<File | undefined>(undefined)

  splashFile = new ValueStore<File | undefined>(undefined)

  splashBackgroundColor = new TextStore('#000', {
    validate: this.validators.notEmpty,
  })

  email = new TextStore('', {
    validate: this.validators.email,
  })

  clubFitbase = new TextStore('', {
    validate: (it) => {
      if ((it?.length ?? 0) > 15) {
        return `${this.strings.errorMaxLength} 15`
      }

      if (this.validators.notEmpty(it)) {
        return this.validators.notEmpty(it)
      }

      return undefined
    },
  })

  city = new TextStore('', {
    validate: this.validators.notEmpty,
  })

  extraText = new TextStore('')

  loginSmsInt = new TextStore('', {
    validate: this.validators.notEmpty,
  })

  passwordSmsInt = new TextStore('', {
    validate: this.validators.notEmpty,
  })

  onlinePay = new TextStore('', {
    validate: this.validators.notEmpty,
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
