import LeaveForm from '@/components/LeaveForm';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { UserRoundX } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

const page = async () => {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const isSupervisorOrHr =
    data?.user?.role === 'supervisor' || data?.user?.role === 'hr';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex gap-2">
            <UserRoundX className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Leave Request
            </h1>
          </div>
          <p className="text-muted-foreground mt-1">
            Submit a new leave request and view your balance.
          </p>
        </div>

        {isSupervisorOrHr && (
          <Link href="/dashboard/leave-request">
            <Button variant="outline">View Leave Requests</Button>
          </Link>
        )}
      </div>

      {/* <MyLeaveBalanceCard myLeaveBalance={myLeaveBalance} /> */}
      {/* Leave Balance Cards  */}
      {/* <LeaveBalanceCards leaveBalance={aggregatedLeaveBalance} /> */}

      {/* Parent grid */}
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* ── Leave Request Form ── */}
        <LeaveForm />

        {/* ── Recent Requests ── */}
        {/* sticky: stays in view while scrolling the form on desktop */}
        <div className="lg:sticky lg:top-6 self-start">
          {/* <RecentRequests recentRequests={recentRequests} /> */}
        </div>
      </div>
    </div>
  );
};

export default page;
