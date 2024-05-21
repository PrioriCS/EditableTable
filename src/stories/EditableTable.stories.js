import { BinocularsFill, Search } from 'react-bootstrap-icons';
import EditableTable from '../components/Table/EditableTable';

export default {
  title: 'EditableTable',
  component: EditableTable,
};

const data = {
  table: {
    transferableRow: true,
  },
  head: {
    columns: [
      { key: 'id', primaryKey: true, value: 'ID' },
      { key: 'client_name', value: 'Nome do Cliente', editable: true },
      { key: 'phone', value: 'Telefone' },
    ],
  },
  body: {
    values: [
      {
        data: [
          { key: 'id', value: '1' },
          {
            key: 'client_name',
            value: 'Bernardo Magueta Kowalsky',
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
          },
        ],
      },
    ],
  },
};

export const Default = {
  args: {
    primary: true,
    data: data,
  },
};

const Personalized = ({ functions, value }) => {
  const { test } = functions;
  return (
    <button type='button' onClick={() => test(value)} className='flex px-3 items-center w-full justify-center'>
      {value}
    </button>
  );
};

const test = (value) => {
  console.log(value);
};

const selections = (value) => {
  console.log(value);
};

const search = (value) => {
  console.log(value);
};

const changePage = (page) => {
  console.log(page);
  dataWithStyle.body = {
    ...dataWithStyle.body,
    values: [
      {
        data: [
          { key: 'id', type: 'number', value: '3' },
          {
            key: 'client_name',
            value: 'Vitor Marcelo Vicente',
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
          },
        ],
        style: {
          background: 'bg-pink-200',
          disabled: 'bg-green-200',
          text: 'text-red-600',
        },
      },
      {
        data: [
          { key: 'id', value: '4' },
          {
            key: 'client_name',
            value: 'Lucas Matheus Gonçalves',
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
          },
        ],
      },
    ],
  };
};

const ButtonTest = () => {
  return <button type='button'>Teste</button>;
};

let dataWithStyle = {
  table: {
    style: {
      border: 'border-red-800',
    },
    scrollX: true,
    scrollY: true,
    scrollMaxHeight: 'max-h-40',
    transferableRow: true,
    rowsSelectionConfirm: selections,
  },
  searchBar: {
    bar: {
      style: {
        rounded: 'rounded-full',
        border: 'border-red-300',
        focus: 'focus:border-red-300',
        text: 'text-red-600',
        placeholder: 'placeholder:text-red-300',
        background: 'bg-cyan-100',
        size: 'text-xl',
      },
      icon: {
        component: Search,
        style: {
          text: 'text-blue-600',
          size: 'text-xl',
        },
      },
      placeholder: 'Pesquise aqui!',
    },
    onRight: ButtonTest,
    saveButton: {
      style: {
        rounded: 'rounded-md',
        border: 'border-pink-300',
        background: 'bg-yellow-200',
        text: 'text-orange-600',
        size: 'text-base',
      },
      icon: {
        component: BinocularsFill,
        style: {
          text: 'text-purple-600',
          size: 'text-xl',
        },
      },
    },
    confirmRows: {
      text: 'Teste',
    },
    style: {
      background: 'bg-green-50',
      border: 'border-amber-300',
      rounded: 'rounded-xl',
    },
    onSearch: search,
    separated: true,
  },
  head: {
    columns: [
      { key: 'id', primaryKey: true, value: 'ID' },
      { key: 'client_name', value: 'Nome do Cliente', editable: true },
      { key: 'phone', value: 'Telefone', personalized: true, component: Personalized, functions: { test } },
    ],
    style: {
      background: 'bg-red-100',
      border: 'border-red-800',
      text: 'text-green-600',
      font: 'font-thin',
      size: 'text-6xl',
    },
    checkbox: {
      style: {
        border: 'border-red-800',
        background: 'bg-red-600',
        width: 'w-10',
        height: 'h-10',
        rounded: 'rounded-full',
      },
    },
  },
  body: {
    style: {
      background: 'bg-yellow-100',
      disabled: 'bg-yellow-200',
      border: 'border-blue-700',
      text: 'text-purple-600',
      size: 'text-4xl',
    },
    checkbox: {
      style: {
        border: 'border-green-400',
        background: 'bg-green-800',
        width: 'w-8',
        height: 'h-8',
        rounded: 'rounded-xl',
      },
    },
  },
  pagination: {
    style: {
      background: 'bg-purple-100',
      border: 'border-green-600',
      text: 'text-red-600',
      size: 'text-2xl',
    },
    icons: {
      size: 'text-3xl',
    },
    lastPage: 5,
    currentPage: 1,
    separated: true,
    handleChangePage: changePage,
  },
};

export const WithStyle = {
  args: {
    primary: false,
    data: {
      ...dataWithStyle,
      body: {
        ...dataWithStyle.body,
        values: [
          {
            data: [
              { key: 'id', type: 'number', value: '1' },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
            },
          },
          {
            data: [
              { key: 'id', value: '2' },
              {
                key: 'client_name',
                value: 'Artur Ramiro Furtado',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
            ],
          },
        ],
      },
    },
  },
};

const update = (value) => {
  const arr = [];
  value.map((val) => {
    let tempObj = {};
    val.data.map((dat) => {
      tempObj = { ...tempObj, [dat.key]: dat.value };
    });
    arr.push(tempObj);
  });

  console.log(arr);
};

const withoutPaginationAndToolbarData = {
  table: {
    withoutToolbar: true,
    withoutPagination: true,
    onConfirm: update,
  },
  searchBar: {
    separated: true,
  },
  head: {
    columns: [
      { key: 'id', primaryKey: true, value: 'ID' },
      { key: 'client_name', value: 'Nome do Cliente', editable: true },
      { key: 'phone', value: 'Telefone' },
    ],
  },
  body: {
    values: [
      {
        data: [
          { key: 'id', value: '1' },
          {
            key: 'client_name',
            value: 'Bernardo Magueta Kowalsky',
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
          },
        ],
      },
    ],
  },
};

export const withoutPaginationAndToolbar = {
  args: {
    primary: true,
    data: withoutPaginationAndToolbarData,
  },
};
