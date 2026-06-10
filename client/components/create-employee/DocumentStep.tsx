import React from 'react';
import { Button } from '../ui/button';

const DocumentStep = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Documents & Verification</h2>
        <p className="text-sm text-muted-foreground">
          Upload required documents for verification.
        </p>
      </div>

      {/* Document Numbers */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* FOrm lies inside here */}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" className="dark:text-white">
          Previous
        </Button>
        <Button type="button" className="dark:text-white">
          Review Details
        </Button>
      </div>
    </div>
  );
};

export default DocumentStep;
