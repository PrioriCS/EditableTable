import React from 'react';
import { isNil, noop } from 'lodash';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TBodyHeader, TColumns, TRow, TRowItem } from '../tableTypes';

const Personalized: React.FC<any> = ({ component, functions, value, row }) => {
  const Component: React.FC<any> = component;
  return <Component functions={functions} value={value} row={row} />;
};

const TableData = ({ columns, item, rowIndex, itemIndex, row, data, style, children }: any) => {
  return (
    <td
      className={twMerge(
        'text-center overflow-x-scroll overflow-y-hidden',
        columns?.find((column: TColumns) => column?.key == item?.key)?.date
          ? 'w-48'
          : columns?.find((column: TColumns) => column?.key == item?.key)?.width
            ? columns?.find((column: TColumns) => column?.key == item?.key)?.width
            : 'w-auto',
        (columns?.find((column: TColumns) => column?.key == item?.key)?.editable &&
          !columns?.find((column: TColumns) => column?.key == item?.key)?.disabled) ||
          columns?.find((column: TColumns) => column?.key == item?.key)?.select ||
          columns?.find((column: TColumns) => column?.key == item?.key)?.personalized
          ? ''
          : 'cursor-not-allowed',
        rowIndex < data?.values?.length - 1 ? 'border-b' : '',
        itemIndex < row?.data?.length - 1 ? 'border-r' : '',
        row?.style?.background &&
          !columns?.find((column: TColumns) => column?.key == item?.key)?.disabled &&
          (columns?.find((column: TColumns) => column?.key == item?.key)?.editable ||
            columns?.find((column: TColumns) => column?.key == item?.key)?.select ||
            columns?.find((column: TColumns) => column?.key == item?.key)?.personalized)
          ? row.style.background
          : style?.background &&
              !columns?.find((column: TColumns) => column?.key == item?.key)?.disabled &&
              (columns?.find((column: TColumns) => column?.key == item?.key)?.editable ||
                columns?.find((column: TColumns) => column?.key == item?.key)?.select ||
                columns?.find((column: TColumns) => column?.key == item?.key)?.personalized)
            ? style.background
            : '',
        row?.style?.disabled
          ? (row?.style?.disabled && columns?.find((column: TColumns) => column?.key == item?.key)?.disabled) ||
            (!columns?.find((column: TColumns) => column?.key == item?.key)?.editable &&
              !columns?.find((column: TColumns) => column?.key == item?.key)?.select &&
              row?.style?.disabled) ||
            (columns?.find((column: TColumns) => column?.key == item?.key)?.select &&
              columns?.find((column: TColumns) => column?.key == item?.key)?.disabled &&
              row?.style?.disabled)
            ? columns?.find((column: TColumns) => column?.key == item?.key)?.personalized
              ? ''
              : row.style.disabled
            : columns?.find((column: TColumns) => column?.key == item?.key)?.personalized
              ? ''
              : row?.style?.background
                ? row.style.background
                : style?.background
                  ? style.background
                  : 'bg-slate-50'
          : (style?.disabled && columns?.find((column: TColumns) => column?.key == item?.key)?.disabled) ||
              (!columns?.find((column: TColumns) => column?.key == item?.key)?.editable && style?.disabled)
            ? columns?.find((column: TColumns) => column?.key == item?.key)?.personalized
              ? ''
              : style.disabled
            : columns?.find((column: TColumns) => column?.key == item?.key)?.personalized
              ? ''
              : row?.style?.background
                ? row.style.background
                : style?.background
                  ? style.background
                  : 'bg-slate-50',
        style?.border ? style.border : '',
        row?.style?.text ? row.style.text : style?.text ? style.text : 'text-gray-600',
        row?.style?.textStyle ? row.style.textStyle : style?.textStyle ? style.textStyle : 'not-italic	',
        style?.size ? style.size : ''
      )}
      style={{ width: columns?.find((column: TColumns) => column?.key == item?.key)?.resizedWidth }}>
      <div
        className='whitespace-nowrap text-center'
        style={{ width: columns?.find((column: TColumns) => column?.key == item?.key)?.resizedWidth }}>
        {children}
      </div>
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
  onRowDoubleClick = noop,
  selected = [],
}: TBodyHeader) {
  const { style, checkbox }: any = data;
  return (
    <tbody id='table-body'>
      {data?.values?.map((row: TRow, rowIndex: number) => (
        <tr key={rowIndex} onDoubleClick={() => onRowDoubleClick({ row: row, primaryKey: transferencykey })}>
          {transferableRow && (
            // @ts-ignore
            <TableData columns={columns} row={row} rowIndex={rowIndex} itemIndex={0} data={data} style={style}>
              <div className='flex items-center justify-center'>
                <input
                  type='checkbox'
                  checked={selected.find((item: string | number | boolean) => {
                    const index = row?.data?.findIndex((val: TRowItem) => val.key == transferencykey);
                    //@ts-ignore
                    return row?.data[index]?.value == item;
                  })}
                  onChange={() => handleSelectRow(rowIndex)}
                  className={twMerge(
                    'appearance-none focus:ring-0 focus:ring-offset-0 cursor-pointer',
                    checkbox?.style?.width ? checkbox.style.width : 'w-6',
                    checkbox?.style?.height ? checkbox.style.height : 'h-6',
                    checkbox?.style?.rounded ? checkbox.style.rounded : 'rounded-md',
                    checkbox?.style?.border ? checkbox.style.border : '',
                    `checked:${checkbox?.style?.background ? checkbox.style.background : ''}`,
                    `focus:checked:${checkbox?.style?.background ? checkbox.style.background : ''}`,
                    `hover:checked:${checkbox?.style?.background ? checkbox.style.background : ''}`
                  )}
                />
              </div>
            </TableData>
          )}
          {columns.map((column: TColumns) => {
            const item = row.data?.find((value) => value.key == column.key);
            //@ts-ignore
            const itemIndex = row.data?.indexOf(item);
            return (
              item && (
                <TableData
                  columns={columns}
                  item={item}
                  rowIndex={rowIndex}
                  itemIndex={itemIndex}
                  row={row}
                  data={data}
                  style={style}
                  key={itemIndex}>
                  {columns?.find((column: TColumns) => column.key == item.key)?.select ? (
                    <div className='w-full'>
                      <select
                        value={isNil(item.value) ? '' : item.value}
                        onChange={({ target }) =>
                          edit(
                            rowIndex,
                            itemIndex,
                            columns?.find((column: TColumns) => column.key == item.key)?.selectPrimaryKey
                              ? parseInt(target.value)
                              : target.value
                          )
                        }
                        disabled={columns?.find((column: TColumns) => column.key == item.key)?.disabled}
                        className={twMerge(
                          'border-none ring-0 focus:border-transparent focus:ring-0 w-full min-w-max text-center',
                          columns?.find((column: TColumns) => column.key == item.key)?.disabled && row?.style?.disabled
                            ? row.style.disabled
                            : row?.style?.background
                              ? row.style.background
                              : style?.background
                                ? style.background
                                : '',
                          style?.size ? style.size : '',
                          row?.style?.textStyle ? row.style.textStyle : style?.textStyle ? style.textStyle : 'not-italic	',
                          isNil(item.value) ? 'text-gray-300' : '',
                          columns?.find((column: TColumns) => column.key == item.key)?.disabled
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        )}>
                        <option
                          disabled={!columns?.find((column: TColumns) => column.key == item.key)?.canClearSelect}
                          value=''
                          className='text-gray-300'>
                          {columns?.find((column: TColumns) => column.key == item.key)?.selectText
                            ? //@ts-ignore
                              columns.find((column: TColumns) => column.key == item.key).selectText
                            : 'Selecione uma opção'}
                        </option>
                        {//@ts-ignore
                        columns
                          ?.find((column: TColumns) => column.key == item.key)
                          ?.options.map((option, index: number | string) => (
                            <option
                              value={
                                option[
                                  //@ts-ignore
                                  columns?.find((column: TColumns) => column.key == item.key)?.selectKey
                                    ? //@ts-ignore
                                      columns.find((column: TColumns) => column.key == item.key).selectKey
                                    : 'id'
                                ]
                              }
                              key={index}>
                              {
                                option[
                                  //@ts-ignore
                                  columns?.find((column: TColumns) => column.key == item.key)?.selectView
                                    ? //@ts-ignore
                                      columns.find((column: TColumns) => column.key == item.key).selectView
                                    : 'name'
                                ]
                              }
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : columns?.find((column: TColumns) => column.key == item.key)?.editable &&
                    !columns?.find((column: TColumns) => column.key == item.key)?.disabled ? (
                    columns?.find((column: TColumns) => column.key == item.key)?.date ? (
                      <DatePicker
                        selected={item.value}
                        onChange={(val) => edit(rowIndex, itemIndex, val)}
                        disabled={columns?.find((column: TColumns) => column.key == item.key)?.disabled}
                        dateFormat='dd/MM/yyyy'
                        className={twMerge(
                          'border-none ring-0 w-full min-w-max focus:border-transparent focus:ring-0 text-center',
                          row?.style?.background ? row.style.background : style?.background ? style.background : '',
                          row?.style?.textStyle ? row.style.textStyle : style?.textStyle ? style.textStyle : 'not-italic	',
                          style?.size ? style.size : ''
                        )}
                      />
                    ) : (
                      <input
                        type={
                          columns?.find((column: TColumns) => column.key == item.key)?.type
                            ? columns?.find((column: TColumns) => column.key == item.key)?.type
                            : 'text'
                        }
                        value={
                          columns?.find((column: TColumns) => column.key == item.key)?.money &&
                          item?.value &&
                          !isNil(item.value)
                            ? item?.value?.toLocaleString('pt-br', {
                                minimumFractionDigits: 2,
                              })
                            : isNil(item.value)
                              ? ''
                              : item.value
                        }
                        onChange={({ target }) =>
                          edit(
                            rowIndex,
                            itemIndex,
                            target.value,
                            columns?.find((column: TColumns) => column.key == item.key)?.money
                          )
                        }
                        disabled={columns?.find((column: TColumns) => column.key == item.key)?.disabled}
                        className={twMerge(
                          'border-none ring-0 focus:border-transparent focus:ring-0 text-center overflow-y-hidden w-full min-w-max',
                          row?.style?.background ? row.style.background : style?.background ? style.background : '',
                          columns?.find((column: TColumns) => column?.key == item?.key)?.width
                            ? columns?.find((column: TColumns) => column?.key == item?.key)?.width
                            : 'w-full',
                          row?.style?.textStyle ? row.style.textStyle : style?.textStyle ? style.textStyle : 'not-italic	',
                          style?.size ? style.size : ''
                        )}
                      />
                    )
                  ) : columns?.find((column: TColumns) => column.key == item.key)?.personalized ? (
                    <Personalized
                      component={columns?.find((column: TColumns) => column.key == item.key)?.component}
                      functions={columns?.find((column: TColumns) => column.key == item.key)?.functions}
                      value={item.value}
                      row={row}
                    />
                  ) : columns?.find((column: TColumns) => column.key == item.key)?.date && !isNil(item?.value) ? (
                    moment.utc(item.value).format(
                      columns?.find((column: TColumns) => column.key == item.key)?.format
                        ? //@ts-ignore
                          columns.find((column: TColumns) => column.key == item.key).format
                        : 'L'
                    )
                  ) : columns?.find((column: TColumns) => column.key == item.key)?.money && item?.value ? (
                    'R$' +
                    item?.value?.toLocaleString('pt-br', {
                      minimumFractionDigits: 2,
                    })
                  ) : (
                    <div>{item.value}</div>
                  )}
                </TableData>
              )
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
