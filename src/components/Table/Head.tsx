import React, { useState } from 'react';
import { noop } from 'lodash';
import { twMerge } from 'tailwind-merge';
import { TColumns, THead, TTableHeadProps } from '../tableTypes';

const TableHead: React.FC<TTableHeadProps> = ({
  index = 0,
  columns = [],
  column = {},
  style = {},
  checkboxOnly = false,
  handleChangeColumnWidth = noop,
  lineHeight,
  children,
}) => {
  const [width, setWidth] = useState(column?.width ? column?.width : 'w-auto');
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = (e: any) => {
    setStartX(e.clientX);
    setStartWidth(e.target.parentElement.offsetWidth);
    setResizing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!resizing) return;
    const newWidth = startWidth + e.clientX - startX;
    //@ts-ignore
    setWidth(newWidth);

    handleChangeColumnWidth(newWidth, index);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  return (
    <th
      key={index}
      className={twMerge(
        'border-b overflow-x-auto text-center w-auto',
        index < (columns?.length ?? 0) - 1 ? 'border-r' : '',
        column?.primaryKey
          ? lineHeight
            ? lineHeight + ' px-5'
            : 'py-3 px-5'
          : checkboxOnly
            ? ''
            : lineHeight
              ? lineHeight
              : 'py-3',
        style?.border ? style.border : '',
        style?.text ? style.text : 'text-gray-600',
        style?.font ? style.font : '',
        style?.size ? style.size : ''
      )}
      style={{ width }}>
      <div
        className={twMerge('relative whitespace-nowrap', checkboxOnly ? '' : 'cursor-col-resize')}
        style={{ width }}
        onMouseDown={checkboxOnly ? noop : handleMouseDown}>
        {children}
      </div>
    </th>
  );
};

export default function Head({
  data = {},
  handleChangeColumnWidth = noop,
  transferableRow = false,
  handleSelectAll = noop,
  allSelected = false,
  disableAllSelect = false,
}) {
  const { columns, style, checkbox, linesHeight }: THead = data;
  return (
    <thead className={twMerge('sticky top-0 w-full z-10', style?.background ? style.background : 'bg-slate-50')}>
      <tr>
        {transferableRow && (
          <TableHead columns={columns} style={style} checkboxOnly>
            <div className='flex items-center justify-center px-4'>
              <input
                type='checkbox'
                onChange={handleSelectAll}
                checked={allSelected}
                disabled={disableAllSelect}
                className={twMerge(
                  'appearance-none focus:ring-0 focus:ring-offset-0',
                  checkbox?.style?.width ? checkbox.style.width : 'w-6',
                  checkbox?.style?.height ? checkbox.style.height : 'h-6',
                  checkbox?.style?.rounded ? checkbox.style.rounded : 'rounded-md',
                  checkbox?.style?.border ? checkbox.style.border : '',
                  `checked:${checkbox?.style?.background ? checkbox.style.background : ''}`,
                  `focus:checked:${checkbox?.style?.background ? checkbox.style.background : ''}`,
                  `hover:checked:${checkbox?.style?.background ? checkbox.style.background : ''}`,
                  disableAllSelect ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
              />
            </div>
          </TableHead>
        )}

        {columns?.map(
          (column: TColumns, index: number) =>
            !column.disabled && (
              <TableHead
                key={index}
                index={index}
                columns={columns}
                column={column}
                style={style}
                lineHeight={linesHeight}
                handleChangeColumnWidth={handleChangeColumnWidth}>
                {column.value}
              </TableHead>
            )
        )}
      </tr>
    </thead>
  );
}
