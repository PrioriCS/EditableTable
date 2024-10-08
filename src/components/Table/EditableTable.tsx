import { isEmpty, isNil, isUndefined, noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { edit, selectAllRows, selectRow } from '../utils';
import Body from './Body';
import Head from './Head';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { TDataType, TEditableDataType, THead, TTable } from '../tableTypes';

export default function EditableTable({ data }: TDataType) {
  const [editableData, setEditableData] = useState<TEditableDataType>({});
  const [editedData, setEditedData] = useState({ values: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [head, setHead] = useState<THead>(data?.head as THead);

  //@ts-ignore
  const { table = {} } = data;
  const { rowsSelectionConfirm = noop, onConfirm = noop, onRowDoubleClick = noop }: TTable = table;

  useEffect(() => {
    //@ts-ignore
    setEditableData(data);
  }, [data]);

  const handleEdit = (
    rowIndex: string | number,
    itemIndex: string | number,
    newVal: string | number | Date | boolean,
    money = false
  ) => {
    edit(setEditableData, setEditedData, setIsEditing, rowIndex, itemIndex, newVal, money);
  };

  const handleConfirmUpdate = () => {
    onConfirm(editedData.values);
    setEditedData({ values: [] });
    setIsEditing(false);
  };

  const handleConfirmRowsSelection = () => {
    rowsSelectionConfirm(selectedRows, setSelectedRows);
  };

  const handleSelectAll = () => {
    selectAllRows(
      selectedRows,
      editableData,
      setSelectedRows,
      data?.table?.transferencyKey ? data.table.transferencyKey : 'id'
    );
  };

  const handleSelectRow = (rowIndex: string | number) => {
    selectRow(
      editableData,
      rowIndex,
      selectedRows,
      setSelectedRows,
      data?.table?.transferencyKey ? data.table.transferencyKey : 'id'
    );
  };

  const handleChangeColumnWidth = (newWidth: number, index: number) => {
    setHead((dat: any) => {
      const temp = { ...dat };
      temp.columns[index].resizedWidth = newWidth;

      return temp;
    });
  };

  return (
    <div className={twMerge('shadow-gray-600 drop-shadow-[0_0_8px_rgba(30,64,175,0.15)] w-full')}>
      <SearchBar
        editing={isEditing}
        data={editableData?.searchBar}
        handleConfirmUpdate={handleConfirmUpdate}
        handleConfirmRowsSelection={handleConfirmRowsSelection}
        withoutToolbar={data?.table?.withoutToolbar}
        transferableRow={data?.table?.transferableRow}
        selectedRows={selectedRows}
      />
      <div
        className={twMerge(
          'overflow-hidden',
          data?.searchBar?.separated ? 'rounded-t-xl border' : '',
          data?.pagination?.separated || data?.table?.withoutPagination ? 'rounded-b-xl border' : '',
          data?.table?.style?.border ? data.table.style.border : ''
        )}>
        <div
          className={twMerge(
            'overflow-auto',
            data?.table?.scrollY ? (data?.table?.scrollMinHeight ? data.table.scrollMinHeight : 'max-h-96') : 'h-full'
          )}>
          <table className={twMerge('border bg-white', data?.table?.scrollX ? 'max-w-none w-full' : 'w-full')}>
            <Head
              data={head}
              handleChangeColumnWidth={handleChangeColumnWidth}
              transferableRow={data?.table?.transferableRow}
              handleSelectAll={handleSelectAll}
              allSelected={selectedRows.length == editableData?.body?.values?.length && !isEmpty(selectedRows)}
              disableAllSelect={
                isEmpty(editableData?.body?.values) ||
                isNil(editableData?.body?.values) ||
                isUndefined(editableData?.body?.values)
              }
              canRemoveRow={data?.table?.removeRow ? true : false}
            />
            <Body
              data={editableData?.body}
              columns={head?.columns}
              transferableRow={data?.table?.transferableRow}
              transferencykey={data?.table?.transferencyKey ? data.table.transferencyKey : 'id'}
              selected={selectedRows}
              edit={handleEdit}
              handleSelectRow={handleSelectRow}
              onRowDoubleClick={onRowDoubleClick}
              RemoveRowComponent={data?.table?.removeRow}
            />
          </table>
        </div>
      </div>
      {!data?.table?.withoutPagination && <Pagination data={data?.pagination} />}
    </div>
  );
}
