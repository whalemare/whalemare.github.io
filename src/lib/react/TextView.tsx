import { TextField, TextFieldProps } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import { TextStore } from '../mobx/TextStore'

export type TextViewProps = TextFieldProps & {
  store: TextStore
}

export const TextView = observer<TextViewProps>(({ store, helperText, ...restProps }) => {
  const isError = !!store.error
  return (
    <TextField
      error={isError}
      value={store.value}
      onChange={store.onChange}
      {...restProps}
      helperText={isError ? store.error : helperText}
    />
  )
})
