import { Grid, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import { TextView } from '../../../lib/react/TextView'
import { useStrings } from '../../locale/useStrings'
import { useStores } from '../../useStores'

interface ThemeFormComponentProps {}

export const ThemeFormComponent = observer<ThemeFormComponentProps>(({}) => {
  const { formStore } = useStores()
  const strings = useStrings()
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <TextView fullWidth label={strings.primaryColor} store={formStore.primaryColor} />
        </Grid>
        <Grid item sm={12}>
          <TextView
            fullWidth
            helperText={strings.primaryInverseColorHint}
            label={strings.primaryInverseColor}
            store={formStore.primaryInverseColor}
          />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="h6">{strings.preview}</Typography>
        </Grid>
      </Grid>
    </>
  )
})
