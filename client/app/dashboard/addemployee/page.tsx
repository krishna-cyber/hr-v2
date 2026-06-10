import EmployeeSignup from '@/components/create-employee/EmployeeSIgnup';
import React from 'react';

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Add or Update Employee Information
        </h1>
        <p className="text-muted-foreground mt-1">
          Fill in the details below to create a new employee account.
        </p>
      </div>
      <EmployeeSignup />
    </div>
  );
};

export default page;
