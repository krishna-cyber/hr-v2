'use client';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from './ui/button';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
// Password requirements
const passwordRequirements = [
  { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'One number', regex: /[0-9]/ },
  { id: 'special', label: 'One special character', regex: /[^A-Za-z0-9]/ },
];

const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty('Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long'),
    confirmNewPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.newPassword !== val.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmNewPassword'], // Highlights the error directly on this field
      });
    }
  });

const ChangePassword = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const watchedPassword = form.watch('newPassword');

  // Check which requirements are met
  const requirementsMet = useMemo(() => {
    return passwordRequirements.map((req) => ({
      ...req,
      met: req.regex.test(watchedPassword || ''),
    }));
  }, [watchedPassword]);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    const metCount = requirementsMet.filter((r) => r.met).length;
    return (metCount / passwordRequirements.length) * 100;
  }, [requirementsMet]);

  // Get strength label and color
  const getStrengthInfo = (strength: number) => {
    if (strength === 0) return { label: '', color: '' };
    if (strength <= 20) return { label: 'Very Weak', color: 'bg-red-500' };
    if (strength <= 40) return { label: 'Weak', color: 'bg-orange-500' };
    if (strength <= 60) return { label: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 80) return { label: 'Strong', color: 'bg-blue-500' };
    return { label: 'Very Strong', color: 'bg-green-500' };
  };

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    await authClient.changePassword({
      revokeOtherSessions: true,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      fetchOptions: {
        onSuccess(context) {
          toast.success('Password updated successfully!');
        },
        onError(error) {
          toast.error(error.error.message || 'Failed to update password');
          form.reset();
        },
      },
    });
  };

  const strengthInfo = getStrengthInfo(passwordStrength);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      id="change-password-form"
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {/* current password */}
      <Controller
        name="currentPassword"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-currentPassword">
              Current Password
            </FieldLabel>
            <Input
              {...field}
              id="form-rhf-demo-currentPassword"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your current password"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* New password */}
      <Controller
        control={form.control}
        name="newPassword"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="password-toggle">Password</Label>
              <div className="relative">
                <Input
                  {...field}
                  className="bg-background"
                  id="password-toggle"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                />
                <Button
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Password Strength Indicator */}
      {watchedPassword && (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Password Strength</span>
              <span
                className={cn(
                  'font-medium',
                  passwordStrength <= 40
                    ? 'text-red-500'
                    : passwordStrength <= 60
                      ? 'text-yellow-500'
                      : 'text-green-500',
                )}
              >
                {strengthInfo.label}
              </span>
            </div>
            <Progress
              value={passwordStrength}
              className={cn('h-2', strengthInfo.color)}
            />
          </div>

          {/* Requirements Checklist */}
          <div className="grid grid-cols-1 gap-2 p-3 bg-muted/50 rounded-lg">
            {requirementsMet.map((req) => (
              <div
                key={req.id}
                className={cn(
                  'flex items-center gap-2 text-sm transition-colors',
                  req.met ? 'text-green-600' : 'text-muted-foreground',
                )}
              >
                {req.met ? (
                  <Check className="h-4 w-4 shrink-0" />
                ) : (
                  <X className="h-4 w-4 shrink-0" />
                )}
                <span>{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Confirm new password */}
      <Controller
        control={form.control}
        name="confirmNewPassword"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="w-full max-w-sm space-y-2">
              <Label htmlFor="password-toggle">Confirm Password</Label>
              <div className="relative">
                <Input
                  {...field}
                  className="bg-background"
                  id="password-toggle"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                />
                <Button
                  className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button size={'lg'} className="w-full" type="submit">
        Change Password
      </Button>
    </form>
  );
};

export default ChangePassword;
