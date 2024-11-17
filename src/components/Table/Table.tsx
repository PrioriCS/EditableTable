import React from 'react';
import { twMerge } from 'tailwind-merge';
import { TTableType } from '../tableTypes';

export default function Table({ className, scrollY, scrollX, scrollMinHeight, children }: TTableType) {
  return (
    <div className={twMerge('overflow-hidden border', className)}>
      <div className={twMerge('overflow-auto', scrollY ? (scrollMinHeight ?? 'max-h-96') : 'h-full')}>
        <table className={twMerge('bg-white', scrollX ? 'max-w-none w-full' : 'w-full')}>{children}</table>
      </div>
    </div>
  );
}
