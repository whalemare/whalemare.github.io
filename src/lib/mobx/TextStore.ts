import { makeAutoObservable } from 'mobx'

interface TextStoreProps {
  validate?: (value?: string) => string | undefined
}

export class TextStore {
  error?: string

  onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.set(event.target.value)
  }

  set = (value: string) => {
    this.value = value
    if (this.props.validate) {
      this.error = this.props.validate(this.value)
    }
  }

  constructor(public value: string = '', private props: TextStoreProps = {}) {
    makeAutoObservable(this)
  }
}
