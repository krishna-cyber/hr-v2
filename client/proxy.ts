import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { authClient } from './lib/auth-client';

export async function proxy(request: NextRequest) {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!data) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Specify the routes the middleware applies to
};
