import { FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import Linkify from 'react-linkify'

import { TextView } from '../../../lib/react/TextView'
import { useStrings } from '../../locale/useStrings'
import { useStores } from '../../useStores'
import { SocialFormView } from '../view/SocialFormView'

interface MetaFormComponentProps {}

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
  },
  input: {
    textAlign: 'left',
  },
}))

export const MetaFormComponent = observer<MetaFormComponentProps>(({}) => {
  const styles = useStyles()
  const { formStore } = useStores()
  const strings = useStrings()

  return (
    <div>
      <div>
        <Typography align="left" variant="h5">
          {strings.smsInt}
        </Typography>
        <Linkify>
          <Typography align="left">{strings.smsIntDescription}</Typography>
        </Linkify>
        <TextView fullWidth label={strings.loginSmsInt} store={formStore.loginSmsInt} />
        <TextView
          fullWidth
          className={styles.spacing}
          label={strings.passwordSmsInt}
          store={formStore.passwordSmsInt}
          type="password"
        />
      </div>

      <div className={styles.spacing}>
        <Typography align="left" variant="h5">
          {strings.club}
        </Typography>
        <TextView fullWidth label={strings.email} store={formStore.email} type="email" />
        <TextView fullWidth className={styles.spacing} label={strings.city} store={formStore.city} />
        <TextView
          fullWidth
          className={styles.spacing}
          helperText={strings.clubFitbaseHelp}
          label={strings.clubFitbase}
          store={formStore.clubFitbase}
        />
        <TextView
          fullWidth
          multiline
          className={styles.spacing}
          helperText={strings.extraHelp}
          label={strings.extra}
          store={formStore.extraText}
        />

        <FormControl className={styles.spacing}>
          <InputLabel id="pay">{strings.onlinePay}</InputLabel>
          <Select
            fullWidth
            className={styles.input}
            id="pay-id"
            labelId="pay"
            value={formStore.onlinePay.value}
            onChange={formStore.onlinePay.onChange}
          >
            {strings.paymentOptions.map((it) => {
              return (
                <MenuItem key={it} value={it}>
                  {it}
                </MenuItem>
              )
            })}
          </Select>
          <FormHelperText>{strings.onlinePayHelp}</FormHelperText>
        </FormControl>

        <SocialFormView store={formStore.socials} />
      </div>
    </div>
  )
})
