import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';

import { Connection } from 'mongoose';
import { Role } from 'types/types';
import { User } from './admin/schemas/user.schema';
import { MailService } from './mail/mail.service';

export const auth = (
  configService: ConfigService,
  connection: Connection,
  mailService: MailService,
) => {
  if (connection?.db) {
    // better auth instance
    return betterAuth({
      // Database configuration
      database: mongodbAdapter(connection.db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        //for development, disable transactions
        // client: connection.db.client,
      }),

      baseURL: configService.get('BASE_URL') ?? 'http://localhost:4100',
      trustedOrigins: ['http://localhost:3000'],

      // Email and Password Authentication configuration
      emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false,
      },
      emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 60 * 60 * 24, //24 hours
        async sendVerificationEmail({ user, token }) {
          const userCreated = user as unknown as User;

          //verification send only if user is hr
          if (userCreated?.role == Role.hr) {
            await mailService.sendVerifyEmail(user.email, {
              firstName: user.name,
              email: user.email,
              logiverificationlink: `${configService.get('CLIENT_URL')}?token=${token}`,
            });
          }
        },
        sendOnSignIn: false,
      },

      user: {
        additionalFields: {
          role: {
            type: ['admin', 'hr', 'employee', 'supervisor', 'superAdmin'],
            defaultValue: 'employee',
            required: true,
          },
          employeeId: {
            type: 'string',
            required: false,
            defaultValue: null,
          },
        },
      },

      // Google OAuth configuration
      socialProviders: {
        google: {
          prompt: 'select_account',
          clientId: configService.get('GOOGLE_CLIENT_ID') as string,
          clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
          disableImplicitSignUp: true, // Disable automatic sign-up for new users
        },
      },

      // Plugins
      plugins: [
        emailOTP({
          async sendVerificationOTP({ type }) {
            if (type === 'change-email') {
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate email sending delay
            }
          },
        }),
      ],

      // Enable session management with cookies
      session: {
        cookieCache: { enabled: true },
      },

      // advanced options for development and debugging
      advanced: {
        disableOriginCheck: true, // Disable origin check for development purposes (not recommended for production)
      },
    });
  } else {
    throw new Error(
      'Database connection is not established. Please check your MongoDB connection settings.',
    );
  }
};
