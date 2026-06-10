'use client';
import React from 'react';

import { defineStepper } from '@stepperize/react';
import { Card, CardContent } from '../ui/card';
import {
  documentsSchema,
  employmentSchema,
  personalInfoSchema,
} from './createEmployeeSchemas';
import DocumentStep from './DocumentStep';
import EmploymentStep from './EmploymentStep';
import { PersonalStep } from './PersonalStep';
import StepIndicator from './StepIndicator';

export const employeeSignup = defineStepper(
  [
    { id: '1', title: 'Personal Info', schema: personalInfoSchema },
    {
      id: '2',
      title: 'Employment Details',
      schema: employmentSchema,
    },
    { id: '3', title: 'Documents', schema: documentsSchema },
    { id: '4', title: 'Review' },
  ],
  { linear: true },
);

const EmployeeSignup = () => {
  const stepper = employeeSignup.useStepper();

  const currentStep = stepper.current.id;
  const steps = stepper.steps.map((step) => ({
    id: step.id,
    name: step.title,
  }));

  return (
    <employeeSignup.Provider>
      <StepIndicator steps={steps} currentStep={+currentStep} />
      <Card>
        <CardContent className="pt-6">
          <SignUpFlow />
        </CardContent>
      </Card>
    </employeeSignup.Provider>
  );
};

function SignUpFlow() {
  const stepper = employeeSignup.useStepper();
  return stepper.match({
    '1': () => <PersonalStep />,
    '2': () => <EmploymentStep />,
    '3': () => <DocumentStep />,
    '4': () => <>Review step</>,
  });
}
export default EmployeeSignup;
