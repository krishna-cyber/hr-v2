'use client';
import { authClient } from '@/lib/auth-client';
import { Google } from '@/public/google';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';
import { Button } from './ui/button';
import { FieldError, FieldLabel } from './ui/field';

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z
    .string({ message: 'Password is required' })
    .nonempty('Password is required'),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: '/dashboard',
      rememberMe: true,
      fetchOptions: {
        onSuccess(context) {
          toast.success('Login successful!');
        },
        onError(context) {
          form.reset();
          toast.error(
            context.error.message || 'Login failed. Please try again.',
          );
        },
      },
    });
  }

  return (
    <form
      id="login_form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* EMAIL */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <FieldLabel className="font-semibold dark:text-black text-sm sm:text-base">
                Email
              </FieldLabel>

              <input
                {...field}
                placeholder="Enter your email"
                className="w-full dark:text-black py-2.5 sm:py-3 px-3 sm:px-4 border rounded-lg bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-1">
              <FieldLabel
                htmlFor="password"
                className="font-semibold dark:text-black text-sm sm:text-base"
              >
                Password
              </FieldLabel>

              <input
                id="password"
                type="password"
                {...field}
                placeholder="Enter your password"
                className="w-full dark:text-black py-2.5 sm:py-3 px-3 sm:px-4 border rounded-lg bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end mt-3">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Forgot Password ?
          </Link>
        </div>

        {/* SUBMIT */}
        <Button size="lg" type="submit" id="login_form">
          Sign In
        </Button>

        {/* GOOGLE */}
        <Button onClick={() => {
          authClient.signIn.social({
            provider:"google",
            callbackURL: '/dashboard',
            fetchOptions:{
              onSuccess(context) {
                toast.success('Login successful!');
                form.reset()
              },
              onError(context) {
                toast.error(
                  context.error.message || 'Login failed. Please try again.',
                );
              }
            }
          })
        }} variant="outline" type="button">
          <Google />
          Login with Google
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
