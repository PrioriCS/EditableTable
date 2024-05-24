import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { edit, selectAllRows, selectRow } from '../utils';
import { validate } from '../validator';
import Body from './Body';
import Head from './Head';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

export default function EditableTable({ data = {} }) {
  const [editableData, setEditableData] = useState({});
  const [editedData, setEditedData] = useState({ values: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { table = {} } = data;
  const { rowsSelectionConfirm = noop, onConfirm = noop } = table;

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const handleEdit = (rowIndex, itemIndex, newVal) => {
    edit(setEditableData, setEditedData, setIsEditing, rowIndex, itemIndex, newVal);
  };

  const handleConfirmUpdate = () => {
    onConfirm(editedData.values);
  };

  const handleConfirmRowsSelection = () => {
    rowsSelectionConfirm(selectedRows);
  };

  const handleSelectAll = () => {
    selectAllRows(
      selectedRows,
      editableData,
      setSelectedRows,
      data?.table?.transferencykey ? data.table.transferencykey : 'id'
    );
  };

  const handleSelectRow = (rowIndex) => {
    selectRow(
      editableData,
      rowIndex,
      selectedRows,
      setSelectedRows,
      data?.table?.transferencykey ? data.table.transferencykey : 'id'
    );
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
      />
      <div
        className={twMerge(
          'overflow-hidden',
          data?.searchBar?.separated ? 'rounded-t-xl border' : '',
          data?.pagination?.separated || data?.table?.withoutPagination ? 'rounded-b-xl border' : '',
          data?.table?.style?.border ? validate(data.table.style.border, 'border-([\\S]+)') : ''
        )}>
        <div
          className={twMerge(
            'overflow-auto',
            data?.table?.scrollY
              ? data?.table?.scrollMaxHeight
                ? validate(data.table.scrollMaxHeight, 'max-h-([\\S]+)', 'max-h-96', 'height')
                : 'max-h-96'
              : 'h-full'
          )}>
          <table className={twMerge('border bg-white', data?.table?.scrollX ? 'max-w-none w-full' : 'w-full')}>
            <Head
              data={data?.head}
              transferableRow={data?.table?.transferableRow}
              handleSelectAll={handleSelectAll}
              allSelected={selectedRows.length == editableData?.body?.values?.length}
            />
            <Body
              data={editableData?.body}
              columns={data?.head?.columns}
              transferableRow={data?.table?.transferableRow}
              transferencykey={data?.table?.transferencykey ? data.table.transferencykey : 'id'}
              selected={selectedRows}
              edit={handleEdit}
              handleSelectRow={handleSelectRow}
            />
          </table>
        </div>
      </div>
      {!data?.table?.withoutPagination && <Pagination data={data?.pagination} />}
    </div>
  );
}
