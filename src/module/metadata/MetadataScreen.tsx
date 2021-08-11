import {
  AppBar,
  makeStyles,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
  CssBaseline,
} from '@material-ui/core'
import React, { useState } from 'react'
import { useMemo } from 'react'

import { useStrings } from '../locale/useStrings'

import { AppFormComponent } from './component/AppFormComponent'
import { IconFormComponent } from './component/IconFormComponent'
import { ThemeFormComponent } from './component/ThemeFormComponent'
import { BackNextButtonRow } from './view/BackNextButtonRow'

interface MetadataScreenProps {}

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
}))

export const MetadataScreen: React.FC<MetadataScreenProps> = () => {
  const strings = useStrings()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  const steps = useMemo(
    () => [
      {
        title: strings.appInfo,
        Component: <AppFormComponent />,
      },
      {
        title: strings.appTheme,
        Component: <ThemeFormComponent />,
      },
      {
        title: strings.icons,
        Component: <IconFormComponent />,
      },
      {
        title: strings.review,
        Component: <AppFormComponent />,
      },
    ],
    [strings.appInfo, strings.appTheme, strings.icons, strings.review],
  )

  return (
    <>
      <CssBaseline />

      <AppBar className={classes.appBar} color="default" position="absolute">
        <Toolbar>
          <Typography noWrap color="inherit" variant="h6">
            {strings.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography align="center" component="h1" variant="h4">
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
          <BackNextButtonRow
            current={activeStep}
            length={steps.length}
            onPressBack={() => setActiveStep((current) => Math.max(current - 1, 0))}
            onPressNext={() => setActiveStep((current) => Math.min(current + 1, steps.length))}
          />
        </Paper>
      </main>
    </>
  )
}
