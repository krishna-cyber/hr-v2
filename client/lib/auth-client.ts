import {
  emailOTPClient,
  inferAdditionalFields,
} from 'better-auth/client/plugins';
import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from 'better-auth/react';
export const authClient = createAuthClient({
  baseURL: 'http://localhost:4100', // The base URL of your auth server
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
    emailOTPClient(),
    nextCookies(),
  ],

  // Type infer based on server auth setup
  $InferAuth: {
    user: {
      additionalFields: {
        role: {
          type: ['admin', 'hr', 'employee', 'supervisor', 'superAdmin'],
          defaultValue: 'employee',
        },
      },
    },
  },
});
