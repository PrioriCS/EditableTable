import { noop } from 'lodash';
import React from 'react';
import { Floppy, Search } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';

export default function SearchBar({ editing = false, data = {}, handleConfirm = noop, withoutToolbar = false }) {
  const { separated, saveButton, bar, style } = data;
  const SaveIcon = saveButton?.icon?.component;
  const BarIcon = bar?.icon?.component;

  return (
    <div
      className={twMerge(
        'flex items-center justify-between px-4 bg-slate-50 border',
        separated || withoutToolbar
          ? style?.rounded
            ? style.rounded + ' mb-5'
            : 'rounded-xl mb-5'
          : style?.rounded
            ? style.rounded
            : 'rounded-t-xl',
        style?.background ? style.background : 'bg-slate-50',
        style?.border ? style.border : '',
        withoutToolbar ? 'sticky top-4 z-10' : ''
      )}>
      <div className={twMerge('w-1/2 relative', withoutToolbar ? 'py-8' : 'py-5')}>
        {!withoutToolbar && (
          <>
            <input
              className={twMerge(
                'py-1 pr-10 w-full focus:outline-none focus:ring-0',
                bar?.style?.rounded ? bar.style.rounded : 'rounded-full',
                bar?.style?.border ? bar.style.border : 'border-gray-300 focus:border-gray-300',
                bar?.style?.text ? bar.style.text : 'text-gray-600',
                bar?.style?.placeholder ? bar.style.placeholder : 'placeholder:text-gray-300',
                bar?.style?.background ? bar.style.background : ''
              )}
              placeholder={bar?.placeholder ? bar.placeholder : 'Pesquisar...'}
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'>
              {bar?.icon ? (
                <BarIcon
                  className={twMerge(
                    bar?.icon.style.text ? bar.icon.style.text : '',
                    bar?.icon.style.size ? bar.icon.style.size : ''
                  )}
                />
              ) : (
                <Search
                  className={twMerge(
                    bar?.icon.style.text ? bar.icon.style.text : '',
                    bar?.icon.style.size ? bar.icon.style.size : ''
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>
      <div className='w-1/2 flex items-center justify-end'>
        {(editing || withoutToolbar) && (
          <button
            type='button'
            onClick={() => handleConfirm()}
            disabled={!editing}
            className={twMerge(
              'px-5 border py-2 text-gray-600 flex items-center space-x-2',
              saveButton?.style.rounded ? saveButton.style.rounded : 'rounded-md',
              saveButton?.style.border ? saveButton.style.border : 'border-gray-300',
              saveButton?.style.background ? saveButton.style.background : 'bg-white',
              saveButton?.style.text ? saveButton.style.text : 'text-gray-600',
              !editing ? 'cursor-not-allowed' : ''
            )}>
            <p>Salvar</p>
            {saveButton?.icon ? (
              <SaveIcon
                className={twMerge(
                  saveButton?.icon.style.text ? saveButton.icon.style.text : '',
                  saveButton?.icon.style.size ? saveButton.icon.style.size : ''
                )}
              />
            ) : (
              <Floppy
                className={twMerge(
                  saveButton?.icon.style.text ? saveButton.icon.style.text : '',
                  saveButton?.icon.style.size ? saveButton.icon.style.size : ''
                )}
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
