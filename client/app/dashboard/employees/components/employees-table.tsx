'use client';
import { DataTablePagination, DataTableToolbar } from '@/components/data-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { useEffect, useState } from 'react';
import { roles } from '../data/data';
import { type Employee } from '../data/schema';
import { DataTableBulkActions } from './data-table-bulk-actions';
import { employeesColumns as columns } from './employees-columns';

type EmployeesResponse = {
  data: Employee[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function EmployeesTable() {
  // Local UI-only state (not synced with the URL)
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  // Client-side-only filters: name search box + role facet.
  // (Backend only supports page/pageSize/status, so these stay local to the
  // current page of results rather than round-tripping to the server.)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Server-synced state: page, pageSize all live in the URL via nuqs
  // and are sent straight through as query params to the backend.
  const [{ page, pageSize }, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    pageSize: parseAsInteger.withDefault(10),
  });

  const { data: employeesResponse, isFetching } = useQuery({
    queryKey: ['employees', { page, pageSize }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/admin/employees?${params.toString()}`,
        { credentials: 'include' },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return (await response.json()) as EmployeesResponse;
    },
    placeholderData: keepPreviousData, // avoids UI flashing back to empty while refetching a new page
  });

  const employeesData = employeesResponse?.data ?? [];
  const pageCount = employeesResponse?.totalPages ?? 0;

  const onPaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const next =
      typeof updater === 'function'
        ? updater({ pageIndex: page - 1, pageSize })
        : updater;
    setQuery({ page: next.pageIndex + 1, pageSize: next.pageSize });
  };

  // Status is server-driven: the only column filter the toolbar manages for it
  // is mapped straight to the `status` URL param via this bridge.
  const onColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (updater) => {
    setColumnFilters((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;

      return next.filter((f) => f.id);
    });
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: employeesData,
    columns,
    pageCount,
    state: {
      sorting,
      pagination: {
        pageIndex: page - 1,
        pageSize,
      },
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    enableRowSelection: true,
    manualPagination: true, // server already paginates
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // still needed for name/role client-side filters
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) {
      setQuery({ page: pageCount });
    }
  }, [pageCount, page, setQuery]);

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        'flex flex-1 flex-col gap-4',
      )}
    >
      <DataTableToolbar
        table={table}
        searchKey="name"
        searchPlaceholder="Employee name ..."
        filters={[
          {
            columnId: 'status',
            title: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'On Leave', value: 'onLeave' },
              { label: 'Notice Period', value: 'noticePeriod' },
              { label: 'Resigned', value: 'resigned' },
              { label: 'Terminated', value: 'terminated' },
              { label: 'Work From Home', value: 'work_from_home' },
            ],
          },
          {
            columnId: 'role',
            title: 'Role',
            options: roles.map((role) => ({ ...role })),
          },
        ]}
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="group/row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        header.column.columnDef.meta?.className,
                        header.column.columnDef.meta?.thClassName,
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="group/row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
                        cell.column.columnDef.meta?.className,
                        cell.column.columnDef.meta?.tdClassName,
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={cn('h-24 text-center', isFetching && 'opacity-50')}
                >
                  {isFetching ? 'Loading...' : 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} className="mt-auto" />
      <DataTableBulkActions table={table} />
    </div>
  );
}
