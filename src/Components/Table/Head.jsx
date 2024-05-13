import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Head({ data = {} }) {
  const { columns, style } = data;
  return (
    <thead className={twMerge('sticky top-0 w-full', style?.background ? style.background : 'bg-slate-50')}>
      <tr>
        {columns?.map((column, index) => (
          <th
            key={index}
            className={twMerge(
              'border-b whitespace-nowrap',
              index < columns?.length - 1 ? 'border-r' : '',
              column.primaryKey ? 'py-3 px-5' : 'p-3',
              style?.border ? style.border : '',
              style?.text ? style.text : 'text-gray-600',
              style?.font ? style.font : '',
              style?.size ? style.size : ''
            )}>
            {column.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
