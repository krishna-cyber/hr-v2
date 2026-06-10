import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserX } from 'lucide-react';
import React from 'react';

const statsConfig = [
  {
    label: 'Pending',
    value: 10,
    borderColor: 'border-l-amber-500',
  },
  {
    label: 'Approved',
    value: 20,
    borderColor: 'border-l-green-500',
  },
  {
    label: 'Rejected',
    value: 6,
    borderColor: 'border-l-red-500',
  },
];

const page = () => {
  //fetch number of pending , approved and rejected leave requests

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <header>
        <div className="flex gap-2">
          <UserX className="h-8 w-8" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Leave Requests
          </h1>
        </div>
        <p className="text-muted-foreground mt-1">
          Manage pending and approved leave requests.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statsConfig.map((stat) => (
          <Card key={stat.label} className={`border-l-4 ${stat.borderColor}`}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      {/* Tabs with Request List */}
      {/* <LeaveRequestTabs
        activeTab={activeTab}
        stats={stats}
        requests={requests}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        scrollRef={scrollRef}
        onTabChange={handleTabChange}
        onScroll={handleScroll}
        onApprove={handleApprove}
        onReject={handleReject}
      /> */}
    </div>
  );
};

export default page;
