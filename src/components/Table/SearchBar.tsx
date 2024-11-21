import { TSearchBar } from 'components/tableTypes';
import React, { useState } from 'react';
import { Search } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';
import { useTableContext } from './TableContext';

export default function SearchBar({
  className,
  inputClassName,
  iconClassName,
  filterKey,
  placeholder,
  icon: Icon,
  right: Right,
}: TSearchBar) {
  const [filter, setFilter] = useState('');
  const { filterData } = useTableContext();

  const Filter = (value = '') => {
    setFilter(value);
    if (filterData) filterData(value, filterKey ?? 'name');
  };

  return (
    <div className={twMerge('w-full bg-white rounded-t-xl overflow-hidden border py-3 px-5 flex items-center', className)}>
      <div className='w-1/2 relative'>
        <input
          value={filter}
          onChange={({ target }) => Filter(target.value)}
          placeholder={placeholder ?? 'Pesquisar...'}
          className={twMerge(
            'w-full ring-0 border-gray-300 focus:border-gray-300 text-gray-600 rounded-full focus:ring-0 overflow-y-hidden py-1 pl-10 placeholder:text-gray-300',
            inputClassName
          )}
        />
        {Icon ? (
          <Icon className={twMerge('absolute top-1/2 -translate-y-1/2 ml-3 text-gray-300', iconClassName)} />
        ) : (
          <Search className={twMerge('absolute top-1/2 -translate-y-1/2 ml-3 text-gray-300', iconClassName)} />
        )}
      </div>
      <div className='w-1/2 flex justify-end'>{Right && <Right />}</div>
    </div>
  );
}
