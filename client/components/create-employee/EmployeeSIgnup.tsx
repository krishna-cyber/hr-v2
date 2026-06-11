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
import ReviewForm from './ReviewForm';
import { Pattern } from './Stepper';

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
  return (
    <employeeSignup.Provider>
      {/* Step indicator */}
      <Pattern />

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
    '4': () => <ReviewForm />,
  });
}
export default EmployeeSignup;
