import { noop } from 'lodash';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

const TableHead = ({ index = '', columns = [], column = {}, style = {}, checkboxOnly = false, children }) => {
  return (
    <th
      key={index}
      className={twMerge(
        'border-b whitespace-nowrap',
        index < columns?.length - 1 ? 'border-r' : '',
        column?.primaryKey ? 'py-3 px-5' : checkboxOnly ? '' : 'p-3',
        style?.border ? validate(style.border, 'border-([\\S]+)') : '',
        style?.text ? validate(style.text, 'text-([\\S]+)', 'text-gray-600') : 'text-gray-600',
        style?.font ? validate(style.font, 'font-([\\S]+)', '', 'weight') : '',
        style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : ''
      )}>
      {children}
    </th>
  );
};

export default function Head({ data = {}, transferableRow = false, handleSelectAll = noop(), allSelected = false }) {
  const { columns, style, checkbox } = data;
  return (
    <thead
      className={twMerge(
        'sticky top-0 w-full',
        style?.background ? validate(style.background, 'bg-([\\S]+)', 'bg-slate-50') : 'bg-slate-50'
      )}>
      <tr>
        {transferableRow && (
          <TableHead columns={columns} style={style} checkboxOnly>
            <div className='flex items-center justify-center'>
              <input
                type='checkbox'
                onChange={handleSelectAll}
                checked={allSelected}
                className={twMerge(
                  'appearance-none focus:ring-0 focus:ring-offset-0',
                  checkbox?.style?.width ? validate(checkbox.style.width, 'w-([\\S]+)', 'w-6', 'height') : 'w-6',
                  checkbox?.style?.height ? validate(checkbox.style.height, 'h-([\\S]+)', 'h-6', 'height') : 'h-6',
                  checkbox?.style?.rounded
                    ? validate(checkbox.style.rounded, 'rounded-([\\S]+)', 'rounded-md', 'direction')
                    : 'rounded-md',
                  checkbox?.style?.border ? validate(checkbox.style.border, 'border-([\\S]+)') : '',
                  `checked:${checkbox?.style?.background ? validate(checkbox.style.background, 'bg-([\\S]+)') : ''}`,
                  `focus:checked:${checkbox?.style?.background ? validate(checkbox.style.background, 'bg-([\\S]+)') : ''}`,
                  `hover:checked:${checkbox?.style?.background ? validate(checkbox.style.background, 'bg-([\\S]+)') : ''}`
                )}
              />
            </div>
          </TableHead>
        )}

        {columns?.map((column, index) => (
          <TableHead key={index} index={index} columns={columns} column={column} style={style}>
            {column.value}
          </TableHead>
        ))}
      </tr>
    </thead>
  );
}
