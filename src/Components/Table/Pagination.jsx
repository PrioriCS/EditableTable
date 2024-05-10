import React from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';

export default function Pagination({ data = {} }) {
  const { separated } = data;

  return (
    <div
      className={twMerge(
        'flex items-center justify-end p-4 bg-slate-50 border space-x-2 text-sm text-gray-600',
        separated ? 'rounded-xl mt-5' : 'rounded-b-xl'
      )}>
      <button
        type='button'
        className='bg-white rounded-md py-1.5 text-base px-1.5 border border-gray-300'
        title='Voltar ao início'>
        <ChevronDoubleLeft />
      </button>
      <button className='bg-white rounded-md py-1.5 text-base px-1.5 border border-gray-300'>
        <ChevronLeft />
      </button>
      <button type='button' className='bg-white rounded-md py-1 px-2.5 border border-gray-300'>
        1
      </button>
      <button type='button' className='bg-white rounded-md py-1 px-2.5 border border-gray-300'>
        2
      </button>
      <button type='button' className='bg-white rounded-md py-1 px-2.5 border border-gray-300'>
        3
      </button>
      <button type='button' className='bg-white rounded-md py-1 px-2.5 border border-gray-300'>
        4
      </button>
      <button type='button' className='bg-white rounded-md py-1 px-2.5 border border-gray-300'>
        5
      </button>
      <button type='button' className='bg-white rounded-md py-1.5 text-base px-1.5 border border-gray-300'>
        <ChevronRight />
      </button>
      <button
        type='button'
        className='bg-white rounded-md py-1.5 text-base px-1.5 border border-gray-300'
        title='Última página'>
        <ChevronDoubleRight />
      </button>
    </div>
  );
}
