import React from 'react';
import { cn } from '../lib/utils';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, striped, hoverable, children, ...props }, ref) => {
    return (
      <div className="overflow-x-auto">
        <table
          ref={ref}
          className={cn(
            'min-w-full divide-y divide-gray-200',
            striped && 'divide-y-0',
            className,
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  },
);

Table.displayName = 'Table';

export const TableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <thead className={cn('bg-gray-50', className)} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, children, ...props }) => (
  <tbody className={cn('bg-white divide-y divide-gray-200', className)} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, children, ...props }) => (
  <tr className={cn('hover:bg-gray-50', className)} {...props}>
    {children}
  </tr>
);

export const TableHeader: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <th
    className={cn(
      'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
      className,
    )}
    {...props}
  >
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, children, ...props }) => (
  <td className={cn('px-6 py-4 whitespace-nowrap text-sm text-gray-900', className)} {...props}>
    {children}
  </td>
);
