import { AppBar, Button, makeStyles, Paper, Step, StepLabel, Stepper, Toolbar, Typography } from '@material-ui/core'
import { useStrings } from './../locale/useStrings'
import React, { useState } from 'react'
import { useMemo } from 'react';
import { AppFormComponent} from './component/AppFormComponent'

interface MetadataScreenProps {
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));


export const MetadataScreen: React.FC<MetadataScreenProps> = (() => {
  const strings = useStrings()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0);


  const steps = useMemo(() => ([{
    title: strings.appInfo,
    Component: <AppFormComponent/>,
  }, {
    title: strings.other,
    Component: <AppFormComponent/>,
  }]), [strings.appInfo, strings.other]);


  return <div style={{ backgroundColor: 'red' }}>
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {strings.name}
        </Typography>
      </Toolbar>
    </AppBar>
    <main className={classes.layout}>
      <Paper>
        <Typography component="h1" variant="h4" align="center">
          {strings.brif}
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((step) => (
            <Step key={step.title}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {steps[activeStep].Component}
      </Paper>
    </main>
  </div>
})
