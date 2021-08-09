import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import RestoreIcon from '@material-ui/icons/Restore'
import { observer } from 'mobx-react-lite'

import { TextView } from '../../../lib/react/TextView'
import { useStrings } from '../../locale/useStrings'
import { useStores } from '../../useStores'
interface AppFormComponentProps {}

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(2),
  },
}))

export const AppFormComponent = observer<AppFormComponentProps>(() => {
  const styles = useStyles()
  const strings = useStrings()
  const { formStore } = useStores()

  return (
    <div style={{ marginRight: 12, marginLeft: 12 }}>
      <Typography gutterBottom variant="h6">
        {strings.mainInfo}
      </Typography>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={12}>
          <TextView
            fullWidth
            helperText={strings.appNameDescription}
            label={strings.appName}
            store={formStore.appName}
            onBlur={formStore.onBlurAppName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextView
            fullWidth
            className={styles.field}
            helperText={strings.appNameStoreDescription}
            label={strings.appNameStore}
            store={formStore.appNameMarket}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <TextView
            fullWidth
            multiline
            className={styles.field}
            defaultValue={strings.marketDescriptionPlaceholder}
            helperText={strings.marketDescriptionHelp}
            label={strings.marketDescription}
            store={formStore.descriptionMarket}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <Button startIcon={<RestoreIcon />} variant="outlined" onClick={formStore.onPressRestoreDescription}>
            {strings.actions.useDefault}
          </Button>
        </Grid>
      </Grid>
    </div>
  )
})
