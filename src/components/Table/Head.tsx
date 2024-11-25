import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TColumns, THead } from '../tableTypes';
import { useTableContext } from './TableContext';

export default function Head({ tHeadClassName, tRowClassName, thClassName, tHeadCheckboxClassName, checkboxClassName }: THead) {
  const { columns, canSelect, isAllSelected, toggleSelectAll } = useTableContext();

  const handleSelectAll = () => {
    if (toggleSelectAll) {
      toggleSelectAll();
    }
  };

  return (
    <thead className={twMerge('border-b', tHeadClassName)}>
      <tr className={tRowClassName}>
        {canSelect && (
          <th className={twMerge('border-r p-2', tHeadCheckboxClassName)}>
            <input
              type='checkbox'
              checked={isAllSelected}
              onChange={() => handleSelectAll()}
              className={twMerge('h-5 w-5 rounded-md ring-0 focus:ring-0 cursor-pointer', checkboxClassName)}
            />
          </th>
        )}
        {(columns as TColumns[]).map((column, index) => (
          <th key={index} style={{ width: column?.width }} className={twMerge('border-r p-3 whitespace-nowrap', thClassName)}>
            {column?.title}
          </th>
        ))}
      </tr>
    </thead>
  );
}

/*
 *
 * const TableHead: React.FC<TTableHeadProps> = ({
  index = 0,
  columns = [],
  column = {},
  style = {},
  checkboxOnly = false,
  handleChangeColumnWidth = noop,
  lineHeight,
  children,
}) => {
  const [width, setWidth] = useState(column?.width ? column?.width : 'w-auto');
  const [resizing, setResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = (e: any) => {
    setStartX(e.clientX);
    setStartWidth(e.target.parentElement.offsetWidth);
    setResizing(true);
  };

  const handleMouseMove = (e: any) => {
    if (!resizing) return;
    const newWidth = startWidth + e.clientX - startX;
    //@ts-ignore
    setWidth(newWidth);

    handleChangeColumnWidth(newWidth, index);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizing]);

  return (
    <th
      key={index}
      className={twMerge(
        'border-b overflow-x-auto text-center w-auto',
        index < (columns?.length ?? 0) - 1 ? 'border-r' : '',
        column?.primaryKey
          ? lineHeight
            ? lineHeight + ' px-5'
            : 'py-3 px-5'
          : checkboxOnly
            ? ''
            : lineHeight
              ? lineHeight
              : 'py-3',
        style?.border ? style.border : '',
        style?.text ? style.text : 'text-gray-600',
        style?.font ? style.font : '',
        style?.size ? style.size : ''
      )}
      style={{ width }}>
      <div
        className={twMerge('relative whitespace-nowrap', checkboxOnly ? '' : 'cursor-col-resize')}
        style={{ width }}
        onMouseDown={checkboxOnly ? noop : handleMouseDown}>
        {children}
      </div>
    </th>
  );
};*/
