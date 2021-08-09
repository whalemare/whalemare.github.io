import { FormStore } from './metadata/store/FormStore'

const formStore = new FormStore()

export function useStores() {
  return {
    formStore: formStore,
  }
}
