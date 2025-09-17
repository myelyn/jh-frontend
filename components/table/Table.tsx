import React from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  className?: string;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  dataSource: T[];
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'striped' | 'bordered';
  rowKey?: keyof T | ((record: T) => string | number);
  onRowClick?: (record: T, index: number) => void;
  loading?: boolean;
  currentRowId?: string | number | null;
}

const Table = <T extends Record<string, unknown>>({
  columns,
  dataSource,
  className = '',
  size = 'medium',
  variant = 'default',
  rowKey = 'id',
  currentRowId,
  onRowClick,
  loading = false,
}: TableProps<T>) => {
  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };

  const variantClasses = {
    default: 'bg-[#f8f6f2]',
    striped: 'bg-[#f8f6f2]',
    bordered: 'border border-[#e8d9c3] bg-[#f8f6f2]',
  };

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    const value = record[rowKey]
    return (typeof value === 'string' || typeof value === 'number') ? value : index;
  };

  // 获取单元格值
  const getCellValue = (column: TableColumn<T>, record: T, index: number) => {
    if (column.render) {
      return column.render(record[column.dataIndex as keyof T], record, index);
    }
    const value = record[column.dataIndex as keyof T];
    return value as React.ReactNode;
  };

  const tableClasses = [
    'w-full border-collapse',
    sizeClasses[size],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div className="overflow-hidden rounded-lg border border-[#e8d9c3]">
        <div className="bg-[#f8f6f2] p-8 text-center text-[#ae9670]">
          加载中...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-[#e8d9c3]">
      <table className={tableClasses}>
        <thead className="bg-[#e8d9c3]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-1 font-500 text-sm text-[#30281d] text-${column.align || 'left'} ${
                  column.className || ''
                }`}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* 表格主体 */}
        <tbody className="bg-[#f8f6f2]">
          {dataSource.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[#ae9670]"
              >
                暂无数据
              </td>
            </tr>
          ) : (
            dataSource.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                className={`border-b border-[#e8d9c3] transition-colors hover:bg-[#f0ebe5] cursor-pointer ${
                  currentRowId && currentRowId === getRowKey(record, index) && 'bg-[#f0ebe5]'
                }`}
                onClick={() => onRowClick?.(record, index)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-1 text-[#2a2419] text-${column.align || 'left'} ${
                      column.className || ''
                    }`}
                  >
                    {getCellValue(column, record, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
