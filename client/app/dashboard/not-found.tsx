import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutNotFound() {
  return (
   <div className="grid min-h-120 grid-cols-1">
      <div className="flex flex-col items-center justify-center px-4 py-4 text-center">
        <h2 className="mb-6 text-5xl font-semibold">404</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Page Not Found</h3>
        <p className="mb-6 max-w-sm text-muted-foreground">
          The page you&apos;re looking for isn&apos;t found, we suggest you back
          to dashboard.
        </p>
        <Button asChild size="lg" className="rounded-lg text-base">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}