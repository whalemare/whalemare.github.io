import ru from './ru'

export const strings = ru

export function useStrings() {
  return strings
}

export type AppStrings = ReturnType<typeof useStrings>
