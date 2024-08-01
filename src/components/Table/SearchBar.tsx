import React from 'react';
import { isEmpty, noop } from 'lodash';
import { CheckSquare, Floppy, Search } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';
import { TBar, TConfirmRows, TSaveButton, TSearchBar, TStyle } from '../tableTypes';

const ConfirmButton = ({
  handleConfirm = noop,
  editing = true,
  wichButton = {} as TConfirmRows,
  text = 'Salvar',
  //@ts-ignore
  icon: Icon,
}) => {
  return (
    <button
      type='button'
      onClick={() => handleConfirm()}
      disabled={!editing}
      className={twMerge(
        'px-5 border py-2 flex items-center space-x-2',
        wichButton?.style?.rounded ? wichButton.style.rounded : 'rounded-md',
        wichButton?.style?.border ? wichButton.style.border : 'border-gray-300',
        wichButton?.style?.background ? wichButton.style.background : 'bg-white',
        wichButton?.style?.text ? wichButton.style.text : 'text-gray-600',
        wichButton?.style?.size ? wichButton.style.size : '',
        !editing ? 'cursor-not-allowed' : ''
      )}>
      <p>{text}</p>

      <Icon
        className={twMerge(
          wichButton?.icon?.style?.text ? wichButton.icon.style.text : 'text-gray-600',
          wichButton?.icon?.style?.size ? wichButton.icon.style.size : 'text-xl'
        )}
      />
    </button>
  );
};

export default function SearchBar({
  editing = false,
  data = {} as TSearchBar,
  handleConfirmUpdate = noop,
  handleConfirmRowsSelection = noop,
  withoutToolbar = false,
  transferableRow = false,
  selectedRows = [],
}) {
  const {
    separated = false,
    saveButton = {} as TSaveButton,
    confirmRows = {} as TConfirmRows,
    bar = {} as TBar,
    style = {} as TStyle,
    onSearch = noop,
    onRight: RightComponent,
  }: TSearchBar = data;
  const SaveIcon = saveButton?.icon?.component ? saveButton.icon.component : Floppy;
  const BarIcon = bar?.icon?.component ? bar.icon.component : Search;
  const ConfirmRowsIcon = confirmRows?.icon?.component ? confirmRows.icon.component : CheckSquare;

  return (
    <div
      className={twMerge(
        'flex items-center justify-between px-4 bg-slate-50 border',
        separated ? (style?.rounded ? style.rounded : 'rounded-xl mb-5') : style?.rounded ? style.rounded : 'rounded-t-xl',
        style?.background ? style.background : 'bg-slate-50',
        style?.border ? style.border : ''
      )}>
      <div className={twMerge('relative', withoutToolbar ? 'py-8' : 'py-5 w-1/2')}>
        {!withoutToolbar && (
          <>
            <input
              className={twMerge(
                'py-1 pr-10 w-full focus:outline-none focus:ring-0',
                bar?.style?.rounded ? bar.style.rounded : 'rounded-full',
                bar?.style?.border ? bar.style.border : 'border-gray-300',
                bar?.style?.focus ? bar.style.focus : 'focus:border-gray-300',
                bar?.style?.text ? bar.style.text : 'text-gray-600',
                bar?.style?.placeholder ? bar.style.placeholder : 'placeholder:text-gray-300',
                bar?.style?.background ? bar.style.background : '',
                bar?.style?.size ? bar.style.size : ''
              )}
              placeholder={bar?.placeholder ? bar.placeholder : 'Pesquisar...'}
              onChange={({ target }) => onSearch(target.value)}
            />
            <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-300'>
              <BarIcon
                className={twMerge(
                  bar?.icon?.style?.text ? bar.icon.style.text : '',
                  bar?.icon?.style?.size ? bar.icon.style.size : 'text-xl'
                )}
              />
            </div>
          </>
        )}
      </div>
      <div className={twMerge('w-1/2 flex items-center justify-end space-x-4', withoutToolbar ? 'w-full' : 'w-1/2')}>
        {RightComponent && <RightComponent />}

        {transferableRow && !isEmpty(selectedRows) && (
          <ConfirmButton
            handleConfirm={handleConfirmRowsSelection}
            wichButton={confirmRows}
            text={confirmRows?.text ? confirmRows.text : 'Confirmar Linhas'}
            icon={ConfirmRowsIcon}
          />
        )}

        {(editing || withoutToolbar) && (
          <ConfirmButton
            handleConfirm={handleConfirmUpdate}
            editing={editing}
            wichButton={saveButton}
            text='Salvar'
            icon={SaveIcon}
          />
        )}
      </div>
    </div>
  );
}
