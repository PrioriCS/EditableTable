import { isEmpty, noop } from 'lodash';
import { CheckSquare, Floppy, Search } from 'react-bootstrap-icons';
import { twMerge } from 'tailwind-merge';
import { validate } from '../validator';
import { IBar, IConfirmRows, ISaveButton, ISearchBar, IStyle } from '../tableTypes';

const ConfirmButton = ({
  handleConfirm = noop,
  editing = true,
  wichButton = {} as IConfirmRows,
  text = 'Salvar',
  icon: Icon,
}) => {
  return (
    <button
      type='button'
      onClick={() => handleConfirm()}
      disabled={!editing}
      className={twMerge(
        'px-5 border py-2 flex items-center space-x-2',
        wichButton?.style?.rounded
          ? validate(wichButton.style.rounded, 'rounded-([\\S]+)', 'rounded-md', 'direction')
          : 'rounded-md',
        wichButton?.style?.border ? validate(wichButton.style.border, 'border-([\\S]+)', 'border-gray-300') : 'border-gray-300',
        wichButton?.style?.background ? validate(wichButton.style.background, 'bg-([\\S]+)', 'bg-white') : 'bg-white',
        wichButton?.style?.text ? validate(wichButton.style.text, 'text-([\\S]+)', 'text-gray-600') : 'text-gray-600',
        wichButton?.style?.size ? validate(wichButton.style.size, 'text-([\\S]+)', '', 'size') : '',
        !editing ? 'cursor-not-allowed' : ''
      )}>
      <p>{text}</p>

      <Icon
        className={twMerge(
          wichButton?.icon?.style?.text
            ? validate(wichButton.icon.style.text, 'text-([\\S]+)', 'text-gray-600')
            : 'text-gray-600',
          wichButton?.icon?.style?.size ? validate(wichButton.icon.style.size, 'text-([\\S]+)', 'text-xl', 'size') : 'text-xl'
        )}
      />
    </button>
  );
};

export default function SearchBar({
  editing = false,
  data = {} as ISearchBar,
  handleConfirmUpdate = noop,
  handleConfirmRowsSelection = noop,
  withoutToolbar = false,
  transferableRow = false,
  selectedRows = [],
}) {
  const {
    separated = false,
    saveButton = {} as ISaveButton,
    confirmRows = {} as IConfirmRows,
    bar = {} as IBar,
    style = {} as IStyle,
    onSearch = noop,
    onRight: RightComponent,
  }: ISearchBar = data;
  const SaveIcon = saveButton?.icon?.component ? saveButton.icon.component : Floppy;
  const BarIcon = bar?.icon?.component ? bar.icon.component : Search;
  const ConfirmRowsIcon = confirmRows?.icon?.component ? confirmRows.icon.component : CheckSquare;

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
              onChange={({ target }) => onSearch(target.value)}
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
