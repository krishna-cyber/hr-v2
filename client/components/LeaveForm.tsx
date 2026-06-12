'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizontal, UserRoundX } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const leaveFormSchema = z.object({
  leaveType: z.enum(['sick', 'casual', 'work_from_home'], {
    error: 'Please select a valid leave type',
  }),
});

const LeaveForm = () => {
  const form = useForm<z.infer<typeof leaveFormSchema>>({
    resolver: zodResolver(leaveFormSchema),
  });
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
        {/* <form onSubmit={leaveSubmit} className="space-y-4"> */}
        <form className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Leave Type */}
            <div className="space-y-2">
              <Label htmlFor="leave-type">Leave Type</Label>
              {/* <Select value={leaveType} onValueChange={setLeaveType}> */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="work_from_home">Work from Home</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Type */}
            <div className="space-y-2">
              <Label htmlFor="duration-type">Duration</Label>
              {/* <Select value={durationType} onValueChange={setDurationType}> */}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_day">Full Day (1 day)</SelectItem>
                  <SelectItem value="half_day">Half Day (0.5 day)</SelectItem>
                  <SelectItem value="multiple_days">Multiple Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Leave Category */}
            <div className="space-y-2">
              <Label htmlFor="paid-type">Leave Category</Label>
              <Select
              // value={leaveCategory}
              // onValueChange={setLeaveCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid Leave</SelectItem>
                  {/* {leaveType !== 'work_from_home' && (
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      )} */}
                </SelectContent>
              </Select>
            </div>

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
            {/* {durationType === 'multiple_days' && (
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <div className="relative">
                      <NepaliDatePicker
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
                      )}
                    </div>
                  </div>
                )} */}

            {/* Half Day Period */}
            {/* {durationType === 'half_day' && (
                  <div className="space-y-2">
                    <Label htmlFor="half-day-period">Half Day Period</Label>
                    <Select
                      value={halfDayPeriod}
                      onValueChange={setHalfDayPeriod}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first_half">First Half</SelectItem>
                        <SelectItem value="second_half">Second Half</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )} */}
          </div>

          {/* Summary */}
          {/* {startDate && (
                <div className="rounded-md bg-primary/5 border border-primary/10 p-3 text-sm space-y-1">
                  <p className="text-muted-foreground">
                    📅 {durationType === 'half_day' && 'Half day leave on '}
                    {durationType === 'full_day' && 'Full day leave on '}
                    {durationType === 'multiple_days' && 'Leave from '}
                    <span className="font-medium text-foreground">
                      {startBs}
                      {durationType === 'multiple_days' && endBs && (
                        <> to {endBs}</>
                      )}
                      {' (BS)'}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    AD: {format(startDate, 'PPP')}
                    {durationType === 'multiple_days' && endDate && (
                      <> to {format(endDate, 'PPP')}</>
                    )}
                  </p>
                  {durationType === 'half_day' && halfDayPeriod && (
                    <p className="text-muted-foreground">
                      ⏰{' '}
                      {halfDayPeriod === 'first_half'
                        ? '9:00 AM - 1:30 PM (Morning)'
                        : '1:30 PM - 6:00 PM (Afternoon)'}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    📊 Total Leave:{' '}
                    <span className="font-medium text-foreground">
                      {calculateLeaveDays()} day(s)
                    </span>
                  </p>
                </div>
              )} */}

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Briefly describe the reason for your leave..."
              rows={4}
              value={''}
              //   onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <Button
            type="submit"
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
