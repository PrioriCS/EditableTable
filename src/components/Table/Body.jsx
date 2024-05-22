import { noop } from 'lodash';
import moment from 'moment';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

const Personalized = ({ component, functions, value }) => {
  const Component = component;
  return <Component functions={functions} value={value} />;
};

const TableData = ({ columns, item, rowIndex, itemIndex, row, data, style, children }) => {
  return (
    <td
      className={twMerge(
        'text-center whitespace-nowrap',
        (columns?.find((column) => column?.key == item?.key)?.editable &&
          !columns?.find((column) => column?.key == item?.key)?.disabled) ||
          columns?.find((column) => column?.key == item?.key)?.personalized
          ? ''
          : 'cursor-not-allowed px-4',
        rowIndex < data?.values?.length - 1 ? 'border-b' : '',
        itemIndex < row?.data?.length - 1 ? 'border-r' : '',
        row?.style?.background &&
          !columns?.find((column) => column?.key == item?.key)?.disabled &&
          (columns?.find((column) => column?.key == item?.key)?.editable ||
            columns?.find((column) => column?.key == item?.key)?.personalized)
          ? validate(row.style.background, 'bg-([\\S]+)')
          : style?.background &&
              !columns?.find((column) => column?.key == item?.key)?.disabled &&
              (columns?.find((column) => column?.key == item?.key)?.editable ||
                columns?.find((column) => column?.key == item?.key)?.personalized)
            ? validate(style.background, 'bg-([\\S]+)')
            : '',
        row?.style?.disabled
          ? (row?.style?.disabled && columns?.find((column) => column?.key == item?.key)?.disabled) ||
            (!columns?.find((column) => column?.key == item?.key)?.editable && row?.style?.disabled)
            ? columns?.find((column) => column?.key == item?.key)?.personalized
              ? ''
              : validate(row.style.disabled, 'bg-([\\S]+)', 'bg-slate-50')
            : columns?.find((column) => column?.key == item?.key)?.personalized
              ? ''
              : row?.style?.background
                ? validate(row.style.background, 'bg-([\\S]+)', 'bg-slate-50')
                : style?.background
                  ? validate(style.background, 'bg-([\\S]+)', 'bg-slate-50')
                  : 'bg-slate-50'
          : (style?.disabled && columns?.find((column) => column?.key == item?.key)?.disabled) ||
              (!columns?.find((column) => column?.key == item?.key)?.editable && style?.disabled)
            ? columns?.find((column) => column?.key == item?.key)?.personalized
              ? ''
              : validate(style.disabled, 'bg-([\\S]+)', 'bg-slate-50')
            : columns?.find((column) => column?.key == item?.key)?.personalized
              ? ''
              : row?.style?.background
                ? validate(row.style.background, 'bg-([\\S]+)', 'bg-slate-50')
                : style?.background
                  ? validate(style.background, 'bg-([\\S]+)', 'bg-slate-50')
                  : 'bg-slate-50',
        style?.border ? validate(style.border, 'border-([\\S]+)') : '',
        row?.style?.text
          ? validate(row.style.text, 'text-([\\S]+)', 'text-gray-600')
          : style?.text
            ? validate(style.text, 'text-([\\S]+)', 'text-gray-600')
            : 'text-gray-600',
        style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : ''
      )}>
      {children}
    </td>
  );
};

export default function Body({
  data = {},
  columns = [],
  edit = noop,
  transferableRow = false,
  handleSelectRow = noop,
  selected = [],
}) {
  const { style, checkbox } = data;

  return (
    <tbody>
      {data?.values?.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {transferableRow && (
            <TableData columns={columns} row={row} rowIndex={rowIndex} itemIndex={0} data={data} style={style}>
              <div className='flex items-center justify-center'>
                <input
                  type='checkbox'
                  checked={selected.find((item) => {
                    const index = row?.data?.findIndex((val) => val.key == 'id');
                    return row?.data[index]?.value == item;
                  })}
                  onChange={() => handleSelectRow(rowIndex)}
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
            </TableData>
          )}

          {row?.data?.map((item, itemIndex) => (
            <TableData
              columns={columns}
              item={item}
              rowIndex={rowIndex}
              itemIndex={itemIndex}
              row={row}
              data={data}
              style={style}
              key={itemIndex}>
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
                    'border-none ring-0 w-full focus:border-transparent focus:ring-0 text-center overflow-y-hidden',
                    row?.style?.background
                      ? validate(row.style.background, 'bg-([\\S]+)')
                      : style?.background
                        ? validate(style.background, 'bg-([\\S]+)')
                        : '',
                    style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : ''
                  )}
                />
              ) : columns?.find((column) => column.key == item.key)?.personalized ? (
                <Personalized
                  component={columns?.find((column) => column.key == item.key)?.component}
                  functions={columns?.find((column) => column.key == item.key)?.functions}
                  value={item.value}
                />
              ) : columns?.find((column) => column.key == item.key)?.date ? (
                moment(
                  item.value,
                  columns?.find((column) => column.key == item.key)?.format
                    ? columns.find((column) => column.key == item.key).format
                    : 'L'
                )
              ) : columns?.find((column) => column.key == item.key)?.money ? (
                'R$' +
                item.value.toLocaleString('pt-br', {
                  minimumFractionDigits: 2,
                })
              ) : (
                item.value
              )}
            </TableData>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
