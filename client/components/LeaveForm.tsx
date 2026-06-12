'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizontal, UserRoundX } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const leaveFormSchema = z
  .object({
    leaveCategory: z.enum(['sick', 'casual', 'work_from_home'], {
      error: 'Please select a valid leave type',
    }),
    leaveType: z.enum(['paid', 'unpaid'], {
      error: 'Please select a valid leave category',
    }),
    durationType: z.enum(['full_day', 'half_day', 'multiple_days'], {
      error: 'Please select a valid duration type',
    }),
    halfDayPeriod: z.enum(['first_half', 'second_half'], {
      error: 'Please select a valid half day period',
    }),
    reason: z.string().min(10, 'Reason must be at least 10 characters long'),
  })
  .superRefine((value, context) => {
    //logic to be added here for dynamic field validation
  });

const LeaveForm = () => {
  const form = useForm<z.infer<typeof leaveFormSchema>>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      reason: '',
      leaveCategory: 'casual',
      leaveType: 'paid',
      durationType: 'full_day',
      halfDayPeriod: undefined,
    },
  });

  const durationType = form.watch('durationType');

  const leaveSubmit = (data: z.infer<typeof leaveFormSchema>) => {
    console.log('Form Data:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2">
          <UserRoundX className="h-8 w-8 -translate-y-1.5" />
          <p>New Leave Request</p>
        </CardTitle>
        <CardDescription>Fill in the details below</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Leave Request Form */}

        <form
          id="leave-form"
          onSubmit={form.handleSubmit(leaveSubmit)}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Leave Type */}
            <Controller
              control={form.control}
              name="leaveType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-leave-leaveType">
                    Leave Type
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Leave Type</SelectLabel>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="casual">Casual Leave</SelectItem>
                        <SelectItem value="work_from_home">
                          Work from Home
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Duration Type */}
            <Controller
              control={form.control}
              name="durationType"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-leave-durationType">
                    Duration
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Duration</SelectLabel>
                        <SelectItem value="full_day">
                          Full Day (1 day)
                        </SelectItem>
                        <SelectItem value="half_day">
                          Half Day (0.5 day)
                        </SelectItem>
                        <SelectItem value="multiple_days">
                          Multiple Days
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Leave Category */}

            <Controller
              control={form.control}
              name="leaveCategory"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-leave-leaveCategory">
                    Leave Category
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Leave Type</SelectLabel>
                        <SelectItem value="paid">Paid Leave</SelectItem>
                        {form.getValues('leaveCategory') !==
                          'work_from_home' && (
                          <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Start Date */}
            <div className="space-y-2">
              <Label>
                {/* {durationType === 'multiple_days' ? 'Start Date' : 'Date'} */}
              </Label>
              <div className="relative">
                {/* <NepaliDatePicker
                      inputClassName="form-control w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-0 focus:border-input"
                      className="w-full"
                      value={startBs ?? ''}
                      onChange={(value: string) => {
                        setStartBs(value);
                        const adDate = bsToAdConverter(value);
                        if (!isNaN(adDate.getTime())) setStartDate(adDate);
                      }}
                      options={{ calenderLocale: 'en', valueLocale: 'en' }}
                    /> */}
                {/* {!startBs && (
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                        Select Date (BS)
                      </span>
                    )} */}
              </div>
            </div>

            {/* End Date */}
            {durationType === 'multiple_days' && (
              <div className="space-y-2">
                <Label>End Date</Label>
                <div className="relative">
                  {/* End date picker */}
                  {/* <NepaliDatePicker
                    inputClassName="form-control w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-0 focus:border-input"
                    className="w-full"
                    value={endBs ?? ''}
                    onChange={(value: string) => {
                      setEndBs(value);
                      const adDate = bsToAdConverter(value);
                      if (!isNaN(adDate.getTime())) setEndDate(adDate);
                    }}
                    options={{ calenderLocale: 'en', valueLocale: 'en' }}
                  />
                  {!endBs && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                      Select End Date (BS)
                    </span>
                  )} */}
                </div>
              </div>
            )}

            {/* Half Day Period */}
            {durationType === 'half_day' && (
              <p>Half day selection first half and second half</p>
            )}
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Controller
              control={form.control}
              name="reason"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-leave-reason">Reason</FieldLabel>
                  <Textarea
                    id="form-leave-reason"
                    placeholder="Briefly describe the reason for your leave..."
                    rows={4}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            type="submit"
            form="leave-form"
            className="w-full dark:text-white cursor-pointer"
          >
            <SendHorizontal className="mr-2 h-4 w-4" />
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveForm;
