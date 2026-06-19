'use client';
// import { UsersActionDialog } from './employees-action-dialog';
// import { EmployeesDeleteDialog } from './employees-delete-dialog';
import { useEmployees } from './employees-provider';

export function EmployeesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useEmployees();
  console.log('employees dialogs', { open, currentRow });
  return (
    <>
      {currentRow && (
        <>
          {/* <UsersActionDialog
            key={`employee-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          /> */}

          {/* <EmployeesDeleteDialog
            key={`employee-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          /> */}
        </>
      )}
    </>
  );
}
