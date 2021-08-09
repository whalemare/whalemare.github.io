import { Grid, TextField, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

import { TextView } from '../../../lib/react/TextView'
import { useStrings } from '../../locale/useStrings'
import { useStores } from '../../useStores'

interface AppFormComponentProps {}

export const AppFormComponent = observer<AppFormComponentProps>(() => {
  const strings = useStrings()
  const { formStore } = useStores()

  return (
    <div>
      <Typography gutterBottom variant="h6">
        {strings.mainInfo}
      </Typography>
      <Grid container spacing={3}>
        <Grid item sm={12} xs={12}>
          <TextView
            fullWidth
            helperText={strings.appNameDescription}
            label={strings.appName}
            store={formStore.appName}
          />

          <TextField
            fullWidth
            helperText={strings.appNameStoreDescription}
            label={strings.appNameStore}
            style={{ marginTop: 12 }}
          />
        </Grid>
      </Grid>
    </div>
  )
})
