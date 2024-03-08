import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';
import Venue from './User/Venue';
import WeddInfo from './User/WeddInfo';

function WeddForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const steps = [
    'Venue',
    'Wedding Information',
  ];

  const isStepOptional = (step) => {
    return step === 0; // The first step is now optional
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === steps.length - 1) {
      // No action needed on last step
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Venue />
            <div className='d-flex  w-100  align-items-center justify-content-end'>

            <Button
            variant="outlined"
              color="inherit"
              onClick={handleSkip}
              >
              Skip
            </Button>
            <Button variant="contained" onClick={handleNext} sx={{ ml: 1 }}>
              Next
            </Button>
              </div>
          </>
        );
      case 1:
        return (
          <WeddInfo />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep !== steps.length && (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {getStepContent(activeStep)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Container>
  );
}

export default WeddForm;
