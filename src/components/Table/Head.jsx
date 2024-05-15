import React from 'react';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

export default function Head({ data = {} }) {
  const { columns, style } = data;
  return (
    <thead
      className={twMerge(
        'sticky top-0 w-full',
        style?.background ? validate(style.background, 'bg-([\\S]+)', 'bg-slate-50') : 'bg-slate-50'
      )}>
      <tr>
        {columns?.map((column, index) => (
          <th
            key={index}
            className={twMerge(
              'border-b whitespace-nowrap',
              index < columns?.length - 1 ? 'border-r' : '',
              column.primaryKey ? 'py-3 px-5' : 'p-3',
              style?.border ? validate(style.border, 'border-([\\S]+)') : '',
              style?.text ? validate(style.text, 'text-([\\S]+)', 'text-gray-600') : 'text-gray-600',
              style?.font ? validate(style.font, 'font-([\\S]+)', '', 'weight') : '',
              style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : ''
            )}>
            {column.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
