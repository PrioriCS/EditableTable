import { noop } from 'lodash';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const Personalized = ({ component, functions, value }) => {
  const Component = component;
  return <Component functions={functions} value={value} />;
};

export default function Body({ data = {}, edit = noop }) {
  const { style } = data;
  return (
    <tbody>
      {data?.values?.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row?.data?.map((item, itemIndex) => (
            <td
              key={itemIndex}
              className={twMerge(
                'text-center whitespace-nowrap',
                item.editable || item.personalized ? '' : 'px-5 py-2 cursor-not-allowed',
                rowIndex < data?.values?.length - 1 ? 'border-b' : '',
                itemIndex < row?.data?.length - 1 ? 'border-r' : '',
                style?.background ? style.background : '',
                style?.disabled && !item.editable ? (item?.personalized ? '' : style.disabled) : 'bg-gray-50',
                style?.border ? style.border : '',
                style?.text ? style.text : 'text-gray-600',
                style?.size ? style.size : ''
              )}>
              {item.editable && !item.disabled ? (
                <input
                  type={item?.type ? item.type : 'text'}
                  value={item.value}
                  onChange={({ target }) => edit(rowIndex, itemIndex, target.value)}
                  disabled={!item.editable}
                  className={twMerge(
                    'py-2 border-none ring-0 w-full focus:border-transparent focus:ring-0 text-center',
                    style?.background ? style.background : '',
                    style?.size ? style.size : ''
                  )}
                />
              ) : item.personalized ? (
                <Personalized component={item.component} functions={item.functions} value={item.value} />
              ) : (
                item.value
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
