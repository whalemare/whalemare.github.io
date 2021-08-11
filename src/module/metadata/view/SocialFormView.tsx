import { Button, Grid, TextField } from '@material-ui/core'
import { last } from 'lodash'
import { observer } from 'mobx-react-lite'

import { ValueStore } from '../../../lib/mobx/ValueStore'
import { useStrings } from '../../locale/useStrings'

interface SocialFormViewProps {
  store: ValueStore<string[]>
}

function replace<T>(items: T[], isItem: (it: T, index: number) => boolean, fresh: T) {
  return [...items].map((it, index) => {
    if (isItem(it, index)) {
      return fresh
    }
    return it
  })
}

export const SocialFormView = observer<SocialFormViewProps>(({ store }) => {
  const strings = useStrings()

  return (
    <Grid container>
      {store.value.map((socialText, index) => {
        return (
          <Grid
            item
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            sm={12}
            style={{ marginTop: 8 }}
          >
            <TextField
              fullWidth
              label={strings.link}
              value={socialText}
              onChange={(e) => {
                const next = e.target.value
                const replaced = replace(store.value, (_, mIndex) => mIndex === index, next)
                store.set(replaced)
              }}
            />
          </Grid>
        )
      })}
      <Button
        style={{ marginTop: 12 }}
        onClick={() => {
          const lastItemValue = last(store.value)

          if (!!lastItemValue) {
            store.set([...store.value, ''])
          }
        }}
      >
        {strings.actions.add}
      </Button>
    </Grid>
  )
})
