import { noop } from 'lodash';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Personalized = ({ component, functions, value }) => {
  const Component = component;
  return <Component functions={functions} value={value} />;
};

export default function Body({ data = {}, edit = noop }) {
  return (
    <tbody className='border'>
      <tr>
        {data?.values?.map((row, rowIndex) =>
          row?.data?.map((item, itemIndex) => (
            <td
              key={itemIndex}
              className={twMerge(
                'border text-center whitespace-nowrap text-gray-600',
                item.editable || item.personalized ? '' : 'px-5 py-2 cursor-not-allowed bg-gray-50'
              )}>
              {item.editable ? (
                <input
                  value={item.value}
                  onChange={({ target }) => edit(rowIndex, itemIndex, target.value)}
                  disabled={!item.editable}
                  className='py-2 border-none w-full focus:border-transparent focus:ring-0 text-center'
                />
              ) : item.personalized ? (
                <Personalized component={item.component} functions={item.functions} value={item.value} />
              ) : (
                item.value
              )}
            </td>
          ))
        )}
      </tr>
    </tbody>
  );
}
