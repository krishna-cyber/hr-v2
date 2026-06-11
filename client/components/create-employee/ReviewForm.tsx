import React from 'react';
import { employeeSignup } from './EmployeeSIgnup';

const ReviewForm = () => {
  const stepper = employeeSignup.useStepper();
  const stepperData = stepper.data.all();
  // 1. Extract the inner objects and flatten them into one
  const formData = Object.assign({}, ...Object.values(stepperData));

  console.log(formData);
  return <div>ReviewForm</div>;
};

export default ReviewForm;
