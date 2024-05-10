import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Head({ data = {} }) {
  return (
    <thead className='bg-slate-50 sticky top-0 border text-gray-600 w-full'>
      <tr className='border'>
        {data?.columns?.map((column, index) => (
          <th key={index} className={twMerge('border whitespace-nowrap', column.primaryKey ? 'py-3 px-5' : 'p-3')}>
            {column.value}
          </th>
        ))}
      </tr>
    </thead>
  );
}
