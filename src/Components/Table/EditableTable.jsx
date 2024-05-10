import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Body from './Body';
import Head from './Head';
import Pagination from './Pagination';
import SearchBar from './SearchBar';

export default function EditableTable({ data = {} }) {
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

  return (
    <div className={twMerge('shadow-gray-600 drop-shadow-[0_0_8px_rgba(30,64,175,0.15)] w-full')}>
      <SearchBar editing={isEditing} data={editableData?.searchBar} />
      <div
        className={twMerge(
          'overflow-hidden',
          editableData?.searchBar?.separated ? 'rounded-t-xl border' : '',
          editableData?.pagination?.separated ? 'rounded-b-xl border' : ''
        )}>
        <div className={twMerge('overflow-auto')}>
          <table className='border bg-white w-full'>
            <Head data={editableData?.head} />
            <Body data={editableData?.body} edit={edit} />
          </table>
        </div>
      </div>
      <Pagination data={editableData?.pagination} />
    </div>
  );
}
