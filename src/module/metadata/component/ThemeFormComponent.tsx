import { Grid, Typography } from '@material-ui/core'
import chroma from 'chroma-js'
import { observer } from 'mobx-react-lite'

import { TextView } from '../../../lib/react/TextView'
import { useStrings } from '../../locale/useStrings'
import { useStores } from '../../useStores'
import { ReactComponent as Logo } from '../svg/0_APP_IPHONE_55_0.svg'

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

        <Grid>
          <Logo fill={parseColor(formStore.primaryColor.value)} height={500} width={500} />
        </Grid>
      </Grid>
    </>
  )
})

const parseColor = (value: string) => {
  try {
    return chroma(value).hex()
  } catch (e) {
    return value
  }
}
