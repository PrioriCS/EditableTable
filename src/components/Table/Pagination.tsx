import { noop } from 'lodash';
import { useState } from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

const PageButton = ({
  icon: Icon,
  size = '',
  isIcon = false,
  value = '',
  isCurrent = false,
  onClick = noop,
  disabled = false,
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        'rounded-md border border-gray-300',
        size ? validate(size, 'text-([\\S]+)', 'text-sm', 'size') : 'text-sm',
        isIcon ? 'py-1.5 px-1.5' : 'py-1 px-2.5',
        isCurrent ? 'bg-blue-50' : 'bg-white',
        disabled ? 'cursor-not-allowed bg-gray-100 opacity-75' : 'cursor-pointer'
      )}>
      {Icon && <Icon />}
      {value && value}
    </button>
  );
};

export default function Pagination({ data = {} }) {
  const { separated = false, style = {}, icons = {}, lastPage = 1, currentPage = 1, handleChangePage = noop } = data;
  const [current, setCurrent] = useState(currentPage);

  const maxButtonPages = 5;
  const lastButton = current < lastPage ? maxButtonPages - 1 : maxButtonPages;

  const handleChange = (page) => {
    const newPage = page;
    setCurrent(newPage);
    handleChangePage(newPage);
  };

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
        size={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        disabled={current === 1}
        onClick={() => handleChange(1)}
        isIcon
      />
      <PageButton
        icon={icons?.left?.component ? icons.left.component : ChevronLeft}
        size={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        disabled={current === 1}
        onClick={() => handleChange(current - 1)}
        isIcon
      />

      {Array.from({ length: Math.min(maxButtonPages, lastPage) })
        .map((_, index) => 1 + index + Math.max(current - lastButton, 0))
        .map((itemPage) => (
          <PageButton
            isCurrent={itemPage == current}
            size={style?.size ? style.size : ''}
            key={itemPage}
            value={itemPage}
            onClick={() => handleChange(itemPage)}
          />
        ))}

      <PageButton
        icon={icons?.right?.component ? icons.right.component : ChevronRight}
        size={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        disabled={current === lastPage}
        onClick={() => handleChange(current + 1)}
        isIcon
      />
      <PageButton
        icon={icons?.fullRight?.component ? icons.fullRight.component : ChevronDoubleRight}
        size={icons?.size ? validate(icons.size, 'text-([\\S]+)', 'text-base', 'size') : 'text-base'}
        disabled={current === lastPage}
        onClick={() => handleChange(lastPage)}
        isIcon
      />
    </div>
  );
}
