import { noop } from 'lodash';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';
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
      <SearchBar
        editing={isEditing}
        data={editableData?.searchBar}
        handleConfirm={handleConfirm}
        withoutToolbar={data?.table?.withoutToolbar}
      />
      <div
        className={twMerge(
          'overflow-hidden',
          data?.searchBar?.separated || data?.table?.withoutToolbar ? 'rounded-t-xl border' : '',
          data?.pagination?.separated || data?.table?.withoutPagination ? 'rounded-b-xl border' : '',
          data?.table?.style?.border ? validate(data.table.style.border, 'border-([\\S]+)', 'text-base') : ''
        )}>
        <div
          className={twMerge(
            'overflow-auto',
            data?.table?.scrollY ? (data?.table?.scrollMaxHeight ? data.table.scrollMaxHeight : 'max-h-96') : 'h-full'
          )}>
          <table className={twMerge('border bg-white', data?.table?.scrollX ? 'max-w-screen w-full' : 'w-full')}>
            <Head data={data?.head} />
            <Body data={editableData?.body} columns={data?.head?.columns} edit={edit} />
          </table>
        </div>
      </div>
      {!data?.table?.withoutPagination && <Pagination data={data?.pagination} />}
    </div>
  );
}
