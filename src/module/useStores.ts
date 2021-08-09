import { strings } from './locale/useStrings'
import { FormStore } from './metadata/store/FormStore'

const formStore = new FormStore(strings)

export function useStores() {
  return {
    formStore: formStore,
  }
}
