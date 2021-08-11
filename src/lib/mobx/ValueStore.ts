import { action, makeObservable, observable } from 'mobx'

export interface ValueStoreProps<T> {
  validate?: (value?: T) => string | undefined
}

export class ValueStore<T> {
  error?: string

  set = (value: T) => {
    this.value = value
    if (this.props.validate) {
      this.error = this.props.validate(this.value)
    }
  }

  constructor(public value: T, private props: ValueStoreProps<T> = {}) {
    makeObservable(this, {
      value: observable,
      error: observable,
      set: action,
    })
  }
}
