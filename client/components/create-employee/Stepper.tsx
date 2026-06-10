'use client';

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/reui/stepper';
import { CheckIcon, LoaderCircleIcon } from 'lucide-react';
import { employeeSignup } from './EmployeeSIgnup';

export function Pattern() {
  const stepper = employeeSignup.useStepper();
  const steps = stepper.steps;
  const currentStep = stepper.current.id;

  return (
    <Stepper
      className="w-full mx-auto space-y-8"
      indicators={{
        completed: <CheckIcon className="size-3.5" />,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem
            defaultValue={index + 1}
            key={step.id}
            step={index + 1}
            completed={step.id < currentStep}
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex flex-col gap-2.5">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle>{step.title}</StepperTitle>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
            )}
          </StepperItem>
        ))}
      </StepperNav>
    </Stepper>
  );
}
