import { TableSkeleton } from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { EmployeesDialogs } from './components/employees-dialogs';
import { EmployeesProvider } from './components/employees-provider';
import { EmployeesTable } from './components/employees-table';

const page = async () => {
  return (
    <main className="flex flex-1 flex-col gap-4 sm:gap-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Employee Management
          </h2>
          <p className="text-muted-foreground">
            List, add, or update employee records.
          </p>
        </div>

        {/* Employee Actions */}
        <div className="flex gap-2">
          <Button asChild className="space-x-1">
            <Link href="/dashboard/addemployee">
              Add Employee <UserPlus size={18} />
            </Link>
          </Button>
        </div>
      </div>
      {/* Employees provider and dialogs */}
      <Suspense fallback={<TableSkeleton />}>
        <EmployeesProvider>
          {/* <EmployeesTable data={employees} search={search} /> */}
          <EmployeesTable />
          {/* <EmployeesTable data={employees} search={search} navigate={navigate} /> */}
          <EmployeesDialogs />
        </EmployeesProvider>
      </Suspense>
    </main>

    // </UsersProvider>
  );
};

export default page;
