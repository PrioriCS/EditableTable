import { noop } from 'lodash';
import React from 'react';
import { Floppy, Search } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';

export default function SearchBar({ editing = false, data = {}, handleConfirm = noop, withoutToolbar = false }) {
  const { separated, saveButton, bar, style } = data;
  const SaveIcon = saveButton?.icon?.component ? saveButton.icon.component : Floppy;
  const BarIcon = bar?.icon?.component ? bar.icon.component : Search;

  return (
    <div
      className={twMerge(
        'flex items-center justify-between px-4 bg-slate-50 border',
        separated
          ? style?.rounded
            ? validate(style.rounded, 'rounded-([\\S]+)', 'rounded-xl mb-5', 'direction') + ' mb-5'
            : 'rounded-xl mb-5'
          : style?.rounded
            ? validate(style.rounded, 'rounded-([\\S]+)', 'rounded-t-xl', 'direction')
            : 'rounded-t-xl',
        style?.background ? validate(style.background, 'bg-([\\S]+)', 'bg-slate-50') : 'bg-slate-50',
        style?.border ? validate(style.border, 'border-([\\S]+)') : ''
      )}>
      <div className={twMerge('relative', withoutToolbar ? 'py-8' : 'py-5 w-1/2')}>
        {!withoutToolbar && (
          <>
            <input
              className={twMerge(
                'py-1 pr-10 w-full focus:outline-none focus:ring-0',
                bar?.style?.rounded
                  ? validate(bar.style.rounded, 'rounded-([\\S]+)', 'rounded-full', 'direction')
                  : 'rounded-full',
                bar?.style?.border ? validate(bar.style.border, 'border-([\\S]+)', 'border-gray-300') : 'border-gray-300',
                bar?.style?.focus
                  ? validate(bar.style.focus, 'focus:border-([\\S]+)', 'focus:border-gray-300')
                  : 'focus:border-gray-300',
                bar?.style?.text ? validate(bar.style.text, 'text-([\\S]+)', 'text-gray-600') : 'text-gray-600',
                bar?.style?.placeholder
                  ? validate(bar.style.placeholder, 'placeholder:text-([\\S]+)', 'placeholder:text-gray-300')
                  : 'placeholder:text-gray-300',
                bar?.style?.background ? validate(bar.style.background, 'bg-([\\S]+)') : '',
                bar?.style?.size ? validate(bar.style.size, 'text-([\\S]+)', '', 'size') : ''
              )}
              placeholder={bar?.placeholder ? bar.placeholder : 'Pesquisar...'}
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'>
              <BarIcon
                className={twMerge(
                  bar?.icon?.style?.text ? validate(bar.icon.style.text, 'text-([\\S]+)') : '',
                  bar?.icon?.style?.size ? validate(bar.icon.style.size, 'text-([\\S]+)', 'text-xl', 'size') : 'text-xl'
                )}
              />
            </div>
          </>
        )}
      </div>
      <div className={twMerge('w-1/2 flex items-center justify-end', withoutToolbar ? 'w-full' : 'w-1/2')}>
        {(editing || withoutToolbar) && (
          <button
            type='button'
            onClick={() => handleConfirm()}
            disabled={!editing}
            className={twMerge(
              'px-5 border py-2 flex items-center space-x-2',
              saveButton?.style?.rounded
                ? validate(saveButton.style.rounded, 'rounded-([\\S]+)', 'rounded-md', 'direction')
                : 'rounded-md',
              saveButton?.style?.border
                ? validate(saveButton.style.border, 'border-([\\S]+)', 'border-gray-300')
                : 'border-gray-300',
              saveButton?.style?.background ? validate(saveButton.style.background, 'bg-([\\S]+)', 'bg-white') : 'bg-white',
              saveButton?.style?.text ? validate(saveButton.style.text, 'text-([\\S]+)', 'text-gray-600') : 'text-gray-600',
              saveButton?.style?.size ? validate(saveButton.style.size, 'text-([\\S]+)', '', 'size') : '',
              !editing ? 'cursor-not-allowed' : ''
            )}>
            <p>Salvar</p>

            <SaveIcon
              className={twMerge(
                saveButton?.icon?.style?.text
                  ? validate(saveButton.icon.style.text, 'text-([\\S]+)', 'text-gray-600')
                  : 'text-gray-600',
                saveButton?.icon?.style?.size
                  ? validate(saveButton.icon.style.size, 'text-([\\S]+)', 'text-xl', 'size')
                  : 'text-xl'
              )}
            />
          </button>
        )}
      </div>
    </div>
  );
}
