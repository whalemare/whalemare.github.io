import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useStrings } from '../../locale/useStrings';

interface BackNextButtonRowProps {
  length: number
  current: number
  onPressBack: () => void
  onPressNext: () => void
}

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export const BackNextButtonRow: React.FC<BackNextButtonRowProps> = ({current, length, onPressBack, onPressNext}) => {
  const classes = useStyles()
  const strings = useStrings()

  return <div className={classes.buttons}>
    {current && (
      <Button onClick={onPressBack} className={classes.button}>
        {strings.actions.back}
      </Button>
    )}
    <Button
      variant="contained"
      color="primary"
      onClick={onPressNext}
      className={classes.button}
    >
      {current === length - 1 ? 'Place order' : strings.actions.next}
    </Button>
  </div>
}
