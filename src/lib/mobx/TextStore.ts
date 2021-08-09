import { makeAutoObservable } from 'mobx'

export class TextStore {
  onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('event.target.value', event.target.value)
    this.value = event.target.value
  }

  set = (value: string) => {
    this.value = value
  }

  constructor(public value: string = '') {
    makeAutoObservable(this)
  }
}
