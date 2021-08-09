import { TextField, TextFieldProps } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import { TextStore } from '../mobx/TextStore'

export type TextViewProps = TextFieldProps & {
  store: TextStore
}

export const TextView = observer<TextViewProps>(({ store, ...restProps }) => {
  return <TextField value={store.value} onChange={store.onChange} {...restProps} />
})
