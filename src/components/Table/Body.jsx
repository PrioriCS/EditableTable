import { isNil, noop } from 'lodash';
import moment from 'moment';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Personalized = ({ component, functions, value, row }) => {
  const Component = component;
  return <Component functions={functions} value={value} row={row} />;
};

const TableData = ({ columns, item, rowIndex, itemIndex, row, data, style, children }) => {
  return (
    <td
      className={twMerge(
        'text-center whitespace-nowrap',
        columns?.find((column) => column?.key == item?.key)?.date ? 'w-48' : '',
        (columns?.find((column) => column?.key == item?.key)?.editable &&
          !columns?.find((column) => column?.key == item?.key)?.disabled) ||
          columns?.find((column) => column?.key == item?.key)?.select ||
          columns?.find((column) => column?.key == item?.key)?.personalized
          ? ''
          : 'cursor-not-allowed px-4 py-2',
        rowIndex < data?.values?.length - 1 ? 'border-b' : '',
        itemIndex < row?.data?.length - 1 ? 'border-r' : '',
        row?.style?.background &&
          !columns?.find((column) => column?.key == item?.key)?.disabled &&
          (columns?.find((column) => column?.key == item?.key)?.editable ||
            columns?.find((column) => column?.key == item?.key)?.select ||
            columns?.find((column) => column?.key == item?.key)?.personalized)
          ? validate(row.style.background, 'bg-([\\S]+)')
          : style?.background &&
              !columns?.find((column) => column?.key == item?.key)?.disabled &&
              (columns?.find((column) => column?.key == item?.key)?.editable ||
                columns?.find((column) => column?.key == item?.key)?.select ||
                columns?.find((column) => column?.key == item?.key)?.personalized)
            ? validate(style.background, 'bg-([\\S]+)')
            : '',
        row?.style?.disabled
          ? (row?.style?.disabled && columns?.find((column) => column?.key == item?.key)?.disabled) ||
            (!columns?.find((column) => column?.key == item?.key)?.editable &&
              !columns?.find((column) => column?.key == item?.key)?.select &&
              row?.style?.disabled) ||
            (columns?.find((column) => column?.key == item?.key)?.select &&
              columns?.find((column) => column?.key == item?.key)?.disabled &&
              row?.style?.disabled)
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
        row?.style?.textStyle
          ? validate(row.style.textStyle, 'italic', 'not-italic', 'textStyle')
          : style?.textStyle
            ? validate(style.textStyle, 'italic', 'not-italic', 'textStyle')
            : 'not-italic	',
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
  transferencykey = '',
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
                    const index = row?.data?.findIndex((val) => val.key == transferencykey);
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

          {row?.data?.map(
            (item, itemIndex) =>
              columns?.find((column) => column.key == item.key) && (
                <TableData
                  columns={columns}
                  item={item}
                  rowIndex={rowIndex}
                  itemIndex={itemIndex}
                  row={row}
                  data={data}
                  style={style}
                  key={itemIndex}>
                  {columns?.find((column) => column.key == item.key)?.select ? (
                    <div className='w-full'>
                      <select
                        value={isNil(item.value) ? '' : item.value}
                        onChange={({ target }) =>
                          edit(
                            rowIndex,
                            itemIndex,
                            columns?.find((column) => column.key == item.key)?.selectPrimaryKey
                              ? parseInt(target.value)
                              : target.value
                          )
                        }
                        disabled={columns?.find((column) => column.key == item.key)?.disabled}
                        className={twMerge(
                          'border-none ring-0 focus:border-transparent focus:ring-0 w-full min-w-max text-center',
                          columns?.find((column) => column.key == item.key)?.disabled && row?.style?.disabled
                            ? validate(row.style.disabled, 'bg-([\\S]+)', 'bg-slate-50')
                            : row?.style?.background
                              ? validate(row.style.background, 'bg-([\\S]+)')
                              : style?.background
                                ? validate(style.background, 'bg-([\\S]+)')
                                : '',
                          style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : '',
                          row?.style?.textStyle
                            ? validate(row.style.textStyle, 'italic', 'not-italic', 'textStyle')
                            : style?.textStyle
                              ? validate(style.textStyle, 'italic', 'not-italic', 'textStyle')
                              : 'not-italic	',
                          isNil(item.value) ? 'text-gray-300' : '',
                          columns?.find((column) => column.key == item.key)?.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                        )}>
                        <option
                          disabled={!columns?.find((column) => column.key == item.key)?.canClearSelect}
                          value=''
                          className='text-gray-300'>
                          {columns?.find((column) => column.key == item.key)?.selectText
                            ? columns.find((column) => column.key == item.key).selectText
                            : 'Selecione uma opção'}
                        </option>
                        {columns
                          ?.find((column) => column.key == item.key)
                          ?.options.map((option, index) => (
                            <option
                              value={
                                option[
                                  columns?.find((column) => column.key == item.key)?.selectKey
                                    ? columns.find((column) => column.key == item.key).selectKey
                                    : 'id'
                                ]
                              }
                              key={index}>
                              {
                                option[
                                  columns?.find((column) => column.key == item.key)?.selectView
                                    ? columns.find((column) => column.key == item.key).selectView
                                    : 'name'
                                ]
                              }
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : columns?.find((column) => column.key == item.key)?.editable &&
                    !columns?.find((column) => column.key == item.key)?.disabled ? (
                    columns?.find((column) => column.key == item.key)?.date ? (
                      <DatePicker
                        selected={item.value}
                        onChange={(val) => edit(rowIndex, itemIndex, val)}
                        disabled={columns?.find((column) => column.key == item.key)?.disabled}
                        dateFormat='dd/MM/yyyy'
                        className={twMerge(
                          'border-none ring-0 w-full min-w-max focus:border-transparent focus:ring-0 text-center',
                          row?.style?.background
                            ? validate(row.style.background, 'bg-([\\S]+)')
                            : style?.background
                              ? validate(style.background, 'bg-([\\S]+)')
                              : '',
                          row?.style?.textStyle
                            ? validate(row.style.textStyle, 'italic', 'not-italic', 'textStyle')
                            : style?.textStyle
                              ? validate(style.textStyle, 'italic', 'not-italic', 'textStyle')
                              : 'not-italic	',
                          style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : ''
                        )}
                      />
                    ) : (
                      <input
                        type={
                          columns?.find((column) => column.key == item.key)?.type
                            ? columns?.find((column) => column.key == item.key)?.type
                            : 'text'
                        }
                        value={
                          columns?.find((column) => column.key == item.key)?.money && item?.value && !isNil(item.value)
                            ? item?.value?.toLocaleString('pt-br', {
                                minimumFractionDigits: 2,
                              })
                            : isNil(item.value)
                              ? ''
                              : item.value
                        }
                        onChange={({ target }) =>
                          edit(rowIndex, itemIndex, target.value, columns?.find((column) => column.key == item.key)?.money)
                        }
                        disabled={columns?.find((column) => column.key == item.key)?.disabled}
                        className={twMerge(
                          'border-none ring-0 focus:border-transparent focus:ring-0 text-center overflow-y-hidden min-w-max w-full',
                          row?.style?.background
                            ? validate(row.style.background, 'bg-([\\S]+)')
                            : style?.background
                              ? validate(style.background, 'bg-([\\S]+)')
                              : '',
                          row?.style?.textStyle
                            ? validate(row.style.textStyle, 'italic', 'not-italic', 'textStyle')
                            : style?.textStyle
                              ? validate(style.textStyle, 'italic', 'not-italic', 'textStyle')
                              : 'not-italic	',
                          style?.size ? validate(style.size, 'text-([\\S]+)', '', 'size') : ''
                        )}
                      />
                    )
                  ) : columns?.find((column) => column.key == item.key)?.personalized ? (
                    <Personalized
                      component={columns?.find((column) => column.key == item.key)?.component}
                      functions={columns?.find((column) => column.key == item.key)?.functions}
                      value={item.value}
                      row={row}
                    />
                  ) : columns?.find((column) => column.key == item.key)?.date && !isNil(item?.value) ? (
                    moment
                      .utc(item.value)
                      .format(
                        columns?.find((column) => column.key == item.key)?.format
                          ? columns.find((column) => column.key == item.key).format
                          : 'L'
                      )
                  ) : columns?.find((column) => column.key == item.key)?.money && item?.value ? (
                    'R$' +
                    item?.value?.toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                    })
                  ) : (
                    item.value
                  )}
                </TableData>
              )
          )}
        </tr>
      ))}
    </tbody>
  );
}
