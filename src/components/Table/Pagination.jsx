import React, { useState } from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

const PageButton = ({ icon: Icon, style = '', isIcon = false, value = '' }) => {
  return (
    <button
      type='button'
      className={twMerge(
        'rounded-md border',
        style ? validate(style, 'text-([\\S]+)', 'text-sm', 'size') : 'text-sm',
        isIcon ? 'py-1.5 px-1.5' : 'py-1 px-2.5',
        style?.background ? style.background : 'bg-white',
        style?.border ? style.border : 'border-gray-300'
      )}>
      {Icon && <Icon />}
      {value && value}
    </button>
  );
};

export default function Pagination({ data = {} }) {
  const { separated, style, icons } = data;
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4, 5]);

  return (
    <div
      className={twMerge(
        'flex items-center justify-end p-4 border space-x-2',
        separated ? 'rounded-xl mt-5' : 'rounded-b-xl',
        style?.background ? style.background : 'bg-slate-50',
        style?.border ? style.border : '',
        style?.text ? style.text : 'text-gray-600'
      )}>
      <PageButton
        icon={icons?.fullLeft?.component ? icons.fullLeft.component : ChevronDoubleLeft}
        style={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        isIcon
      />
      <PageButton
        icon={icons?.left?.component ? icons.left.component : ChevronLeft}
        style={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        isIcon
      />

      {visiblePages?.map((page) => (
        <PageButton style={style?.size ? style.size : ''} key={page} value={page} onClick={setVisiblePages} />
      ))}

      <PageButton
        icon={icons?.right?.component ? icons.right.component : ChevronRight}
        style={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        isIcon
      />
      <PageButton
        icon={icons?.fullRight?.component ? icons.fullRight.component : ChevronDoubleRight}
        style={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        isIcon
      />
    </div>
  );
}
