import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';

export const auth = (configService: ConfigService) => {
  console.log('Initializing authentication with the following configuration:');
  console.log(`BASE_URL: ${configService.get('BASE_URL')}`);
  return betterAuth({
    baseURL: configService.get('BASE_URL') ?? 'http://localhost:4100',
    trustedOrigins: ['http://localhost:5173'],
    emailAndPassword: {
      enabled: true,
    },
    session: {
      cookieCache: { enabled: true },
    },
  });
};
