import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TTableType } from '../tableTypes';
import { useTableContext } from './TableContext';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

export default function Table({ className, scrollY, scrollX, scrollMinHeight, children }: TTableType) {
  const { handleScroll } = useTableContext();

  const handleActiveScroll = (e: any) => {
    if (handleScroll) handleScroll(e);
  };
  return (
    <div className={twMerge('overflow-hidden border', className)}>
      <div
        className={twMerge('overflow-auto', scrollY ? (scrollMinHeight ?? 'max-h-96') : 'h-full')}
        onScroll={(e) => handleActiveScroll(e)}>
        <table className={twMerge('bg-white', scrollX ? 'max-w-none w-full' : 'w-full')}>{children}</table>
      </div>
    </div>
  );
}
