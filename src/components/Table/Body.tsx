import React from 'react';
import moment from 'moment';
moment.locale('pt-br');
import { twMerge } from 'tailwind-merge';
import { TBody, TColumns, TRow, TRowItem } from 'components/tableTypes';

const Personalized = ({ component, functions, value, row, props }: any) => {
  const Component = component;
  return <Component functions={functions} value={value} row={row} {...props} />;
};

const TableData = ({ data = {} as TRowItem, row = {} as TRow, columns = [] as TColumns }) => {
  const column = (columns as TColumns[]).find((column) => column.key == data.key);

  return (
    <td key={data.key} className={twMerge('border-r whitespace-nowrap', data.tDataClassName)}>
      {column?.personalized ? (
        <Personalized
          component={column?.component}
          functions={column?.functions}
          value={data?.value}
          row={row}
          props={column?.props}
        />
      ) : column?.editable ? (
        <input
          type={column?.type ?? 'text'}
          value={
            column?.money
              ? data.value.toLocaleString('pt-br', {
                  minimumFractionDigits: 2,
                })
              : data.value
          }
          className={twMerge(
            'border-none ring-0 focus:border-transparent focus:ring-0 overflow-y-hidden w-full min-w-max p-1.5',
            data.className
          )}
        />
      ) : column?.date ? (
        <div className={twMerge('w-full p-1.5', data.className)}>{moment.utc(data.value).format(column?.format ?? 'L')}</div>
      ) : column?.money ? (
        <div className={twMerge('w-full p-1.5', data.className)}>
          {'R$' +
            data.value.toLocaleString('pt-br', {
              minimumFractionDigits: 2,
            })}
        </div>
      ) : (
        <div className={twMerge('w-full p-1.5', data.className)}>{data.value}</div>
      )}
    </td>
  );
};

export default function Body({ values, columns, tBodyClassName }: TBody) {
  return (
    <tbody className={tBodyClassName}>
      {values?.map((val, index) => (
        <tr key={index} className={val.tRowClassName}>
          {val?.data?.map((response, i) => <TableData key={i} data={response} columns={columns as TColumns} row={val} />)}
        </tr>
      ))}
    </tbody>
  );
}
