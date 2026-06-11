import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { DocumentsFormData, documentsSchema } from './createEmployeeSchemas';
import { employeeSignup } from './EmployeeSIgnup';

const DocumentStep = () => {
  const stepper = employeeSignup.useStepper();
  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: stepper.data.get('3') ?? {
      citizenshipNumber: '',
      panNumber: '',
      citizenshipFrontPhoto: undefined,
      citizenshipBackPhoto: undefined,
      panPhoto: undefined,
      profilePhoto: undefined,
      signaturePhoto: undefined,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const moved = await stepper.next({ data: data });
    if (moved) stepper.setComplete();
  });
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Documents & Verification</h2>
        <p className="text-sm text-muted-foreground">
          Upload required documents for verification.
        </p>
      </div>

      {/* Document Numbers */}
      <form id="document-form" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* citizenship number */}
          <Controller
            name="citizenshipNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Citizenship Number *</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Citizenship number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* PAN number */}
          <Controller
            name="panNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>PAN Number *</FieldLabel>
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="PAN number"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </form>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => stepper.goTo('2')}
          className="dark:text-white"
        >
          Previous
        </Button>
        <Button onClick={onSubmit} className="dark:text-white">
          Review Details
        </Button>
      </div>
    </div>
  );
};

export default DocumentStep;
