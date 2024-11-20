import React from 'react';
import moment from 'moment';
moment.locale('pt-br');
import { twMerge } from 'tailwind-merge';
import { TBody, TColumns, TRow, TRowItem } from 'components/tableTypes';
import { useTableContext } from './TableContext';

const Personalized = ({ component, functions, value, row, props }: any) => {
  const Component = component;
  return <Component functions={functions} value={value} row={row} {...props} />;
};

type TTableData = {
  data: TRowItem;
  row: TRow;
  columns: TColumns;
  edit: Function | undefined;
  rowIndex: number;
  itemIndex: number;
};

const TableData = ({ data, row, columns, edit, rowIndex, itemIndex }: TTableData) => {
  const column = (columns as TColumns[]).find((column) => column.key == data.key);

  const handleEdit = (value: any) => {
    if (edit) {
      edit(rowIndex, itemIndex, data.key, value, column?.money);
    }
  };

  return (
    column?.key == data.key && (
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
            onChange={({ target }) => handleEdit(target.value)}
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
    )
  );
};

const Checkbox = ({ selected, handleSelectItem, val, selectKey, tDataCheckboxClassName, checkboxClassName }: any) => {
  const item = val?.data?.find((item: any) => item?.key == selectKey)?.value;
  return (
    <td className={twMerge('border-r p-2', tDataCheckboxClassName)}>
      <input
        type='checkbox'
        onChange={() => handleSelectItem(item)}
        checked={(selected as number[]).includes(item)}
        className={twMerge('h-5 w-5 rounded-md ring-0 focus:ring-0 cursor-pointer', checkboxClassName)}
      />
    </td>
  );
};

export default function Body({ tBodyClassName, tDataCheckboxClassName, checkboxClassName }: TBody) {
  const { filteredData, columns, canSelect, selected, selectKey, handleSelect, handleEdit } = useTableContext();

  const handleSelectItem = (key: number | string) => {
    if (handleSelect) {
      handleSelect(key);
    }
  };

  return (
    <tbody className={tBodyClassName}>
      {(filteredData as TRow[])?.map((val, index) => (
        <tr key={index} className={twMerge('border-b', val.tRowClassName)}>
          {canSelect && (
            <Checkbox
              selected={selected}
              handleSelectItem={handleSelectItem}
              val={val}
              selectKey={selectKey}
              tdClassName={tDataCheckboxClassName}
              checkboxClassName={checkboxClassName}
            />
          )}
          {val?.data?.map((response, i) => (
            <TableData
              key={i}
              data={response}
              columns={columns as TColumns}
              row={val}
              edit={handleEdit}
              rowIndex={index}
              itemIndex={i}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
}
