import React from 'react';
import { Button } from '../ui/button';

const EmploymentStep = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Employment Details</h2>
        <p className="text-sm text-muted-foreground">
          Enter the employee&apos;s job-related information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {/* Form lies here inside this div */}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" className="dark:text-white">
          Previous
        </Button>
        <Button type="button" className="dark:text-white">
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default EmploymentStep;
