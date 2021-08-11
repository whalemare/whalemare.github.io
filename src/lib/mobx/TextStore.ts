import { ValueStore } from './ValueStore'

export class TextStore extends ValueStore<string> {
  onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.set(event.target.value)
  }
}
