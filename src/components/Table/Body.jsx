import { noop } from 'lodash';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

const Personalized = ({ component, functions, value }) => {
  const Component = component;
  return <Component functions={functions} value={value} />;
};

export default function Body({ data = {}, columns = [], edit = noop }) {
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
                (columns?.find((column) => column.key == item.key)?.editable &&
                  !columns?.find((column) => column.key == item.key)?.disabled) ||
                  columns?.find((column) => column.key == item.key)?.personalized
                  ? ''
                  : 'cursor-not-allowed',
                rowIndex < data?.values?.length - 1 ? 'border-b' : '',
                itemIndex < row?.data?.length - 1 ? 'border-r' : '',
                style?.background &&
                  !columns?.find((column) => column.key == item.key)?.disabled &&
                  (columns?.find((column) => column.key == item.key)?.editable ||
                    columns?.find((column) => column.key == item.key)?.personalized)
                  ? validate(style.background, 'bg-([\\S]+)')
                  : '',
                (style?.disabled && columns?.find((column) => column.key == item.key)?.disabled) ||
                  (!columns?.find((column) => column.key == item.key)?.editable && style?.disabled)
                  ? columns?.find((column) => column.key == item.key)?.personalized
                    ? ''
                    : validate(style.disabled, 'bg-([\\S]+)', 'bg-slate-50')
                  : columns?.find((column) => column.key == item.key)?.personalized
                    ? ''
                    : 'bg-slate-50',
                style?.border ? validate(style.border, 'border-([\\S]+)') : '',
                style?.text ? validate(style.text, 'text-([\\S]+)', 'text-gray-600') : 'text-gray-600',
                style?.size ? validate(style.size, 'text-([\\S]+)') : ''
              )}>
              {columns?.find((column) => column.key == item.key)?.editable &&
              !columns?.find((column) => column.key == item.key)?.disabled ? (
                <input
                  type={
                    columns?.find((column) => column.key == item.key)?.type
                      ? columns?.find((column) => column.key == item.key)?.type
                      : 'text'
                  }
                  value={item.value}
                  onChange={({ target }) => edit(rowIndex, itemIndex, target.value)}
                  disabled={columns?.find((column) => column.key == item.key)?.disabled}
                  className={twMerge(
                    'border-none ring-0 w-full focus:border-transparent focus:ring-0 text-center',
                    style?.background ? validate(style.background, 'bg-([\\S]+)') : '',
                    style?.size ? validate(style.size, 'text-([\\S]+)') : ''
                  )}
                />
              ) : columns?.find((column) => column.key == item.key)?.personalized ? (
                <Personalized
                  component={columns?.find((column) => column.key == item.key)?.component}
                  functions={columns?.find((column) => column.key == item.key)?.functions}
                  value={item.value}
                />
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
