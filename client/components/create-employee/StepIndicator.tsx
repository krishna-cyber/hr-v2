import { cn } from '@/lib/utils';

import { BadgeCheck } from 'lucide-react';
import React from 'react';

const StepIndicator = ({
  steps,
  currentStep,
}: {
  steps: { id: string; name: string }[];
  currentStep: number;
}) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.id} className="flex-1 relative">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200',
                  currentStep > parseInt(step.id)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : currentStep === parseInt(step.id)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted-foreground/30 bg-background text-muted-foreground',
                )}
              >
                {currentStep > parseInt(step.id) ? (
                  <BadgeCheck className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Step Name */}
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center hidden sm:block',
                  currentStep >= parseInt(step.id)
                    ? 'text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {step.name}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 -translate-y-1/2',
                  currentStep > parseInt(step.id)
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30',
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
