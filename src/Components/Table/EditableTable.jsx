import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Body from './Body';
import Head from './Head';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

export default function EditableTable({ data = {}, onConfirm = noop }) {
  const [editableData, setEditableData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const edit = (rowIndex, itemIndex, newVal) => {
    setEditableData((value) => {
      const temp = { ...value };

      temp.body.values[rowIndex].data[itemIndex].value = newVal;

      return temp;
    });
    setIsEditing(true);
  };

  const handleConfirm = () => {
    onConfirm(editableData.body.values);
  };

  return (
    <div className={twMerge('shadow-gray-600 drop-shadow-[0_0_8px_rgba(30,64,175,0.15)] w-full')}>
      <SearchBar editing={isEditing} data={editableData?.searchBar} handleConfirm={handleConfirm} />
      <div
        className={twMerge(
          'overflow-hidden',
          data?.searchBar?.separated ? 'rounded-t-xl border' : '',
          data?.pagination?.separated ? 'rounded-b-xl border' : '',
          data?.table?.style?.border ? data.table.style.border : ''
        )}>
        <div
          className={twMerge(
            'overflow-auto',
            data?.table?.scrollY ? (data?.table?.scrollMaxHeight ? data.table.scrollMaxHeight : 'max-h-96') : ''
          )}>
          <table className={twMerge('border bg-white', data?.table?.scrollX ? 'w-screen' : 'w-full')}>
            <Head data={data?.head} />
            <Body data={editableData?.body} edit={edit} />
          </table>
        </div>
      </div>
      <Pagination data={data?.pagination} />
    </div>
  );
}
