'use client'; // Error boundaries must be Client Components
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { unstable_catchError as catchError, type ErrorInfo } from 'next/error';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-120 grid-cols-1">
      <div className="flex flex-col items-center justify-center px-4 py-4 text-center">
        <h2 className="mb-6 text-5xl font-semibold">500</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Internal Server Error</h3>
        <p className="mb-6 max-w-sm text-muted-foreground">
          Something went wrong on our end. We suggest you go back to the
          dashboard.
        </p>
        <Button
          asChild
          onClick={() => unstable_retry()}
          size="lg"
          className="rounded-lg text-base"
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
