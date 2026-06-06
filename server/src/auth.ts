import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { Connection } from 'mongoose';

export const auth = (configService: ConfigService, connection: Connection) => {
  console.log('Initializing authentication with the following configuration:');
  console.log(`BASE_URL: ${configService.get('BASE_URL')}`);

  console.log(configService.get('GOOGLE_CLIENT_ID'));
  console.log(configService.get('GOOGLE_CLIENT_SECRET'));

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
