import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';

export const auth = (configService: ConfigService) => {
  console.log('Initializing authentication with the following configuration:');
  console.log(`BASE_URL: ${configService.get('BASE_URL')}`);

  console.log(configService.get('GOOGLE_CLIENT_ID'));
  console.log(configService.get('GOOGLE_CLIENT_SECRET'));
  return betterAuth({
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
  });
};
