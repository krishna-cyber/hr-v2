'use client';
import useDialogState from '@/hooks/use-dialog-state';
import React, { useMemo, useState } from 'react';
import { type Employee } from '../data/schema';

type EmployeesDialogType = 'invite' | 'add' | 'edit' | 'delete';

type EmployeesContextType = {
  open: EmployeesDialogType | null;
  setOpen: (str: EmployeesDialogType | null) => void;
  currentRow: Employee | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Employee | null>>;
};

const EmployeesContext = React.createContext<EmployeesContextType | null>(null);

export function EmployeesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useDialogState<EmployeesDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Employee | null>(null);

  const value = useMemo(
    () => ({ open, setOpen, currentRow, setCurrentRow }),
    [open, currentRow, setOpen],
  );

  return <EmployeesContext value={value}>{children}</EmployeesContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployees = () => {
  const employeesContext = React.useContext(EmployeesContext);

  if (!employeesContext) {
    throw new Error('useEmployees has to be used within <EmployeesContext>');
  }

  return employeesContext;
};
