import { BinocularsFill, Search } from 'react-bootstrap-icons';
import { EditableTable } from '../components';
import React from 'react';

export default {
  title: 'EditableTable',
  component: EditableTable,
};

const test = (value) => {
  console.log(value);
};

const Button = () => {
  return <button>A</button>;
};

const data = {
  table: {
    transferableRow: true,
    transferencyKey: 'id',
    onConfirm: test,
    onRowDoubleClick: (e) => console.log(e),
    removeRow: Button,
  },
  head: {
    columns: [
      { key: 'id', primaryKey: true, value: 'ID' },
      { key: 'client_name', value: 'Nome do Cliente', editable: true },
      { key: 'phone', value: 'Telefone' },
      { key: 'date', value: 'Data', date: true, editable: true },
      { key: 'money', value: 'Grana', money: true, editable: true },
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
          { key: 'date', value: new Date() },
          { key: 'money', value: 10000 },
        ],
      },
      {
        data: [
          {
            key: 'client_name',
            value: 'Bernardo Magueta Kowalsky',
          },
          {
            key: 'phone',
            value: '(47) 88881-7898',
          },
          { key: 'money', value: 20000 },
          { key: 'date', value: new Date() },
          { key: 'id', value: '1' },
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

const update = (value) => {
  const arr = [];

  value.map((val) => {
    let tempObj = {};
    val.map((dat) => {
      tempObj = { ...tempObj, [dat.key]: dat.value };
    });
    arr.push(tempObj);
  });

  console.log(arr);
};

let dataWithStyle = {
  table: {
    style: {
      border: 'border-red-800',
    },
    scrollX: true,
    scrollY: true,
    scrollMinHeight: 'max-h-56',
    transferableRow: true,
    rowsSelectionConfirm: selections,
    onConfirm: update,
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
      {
        key: 'code',
        value: 'Teste',
        select: true,
        selectKey: 'code',
        selectView: 'name',
        selectText: 'Selecione aqui',
        selectPrimaryKey: true,
        options: [
          { code: 1, name: 'Teste' },
          { code: 2, name: 'Teste 2' },
          { code: 3, name: 'Bernardo Magueta Kowalsky' },
        ],
      },
      { key: 'date', value: 'Data', date: true, editable: true },
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
              { key: 'id', type: 'number', value: 1 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 2 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 3 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 4 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 5 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 6 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 7 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 8 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', type: 'number', value: 9 },
              {
                key: 'client_name',
                value: 'Bernardo Magueta Kowalsky',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 1,
              },
              { key: 'date', value: new Date() },
            ],
            style: {
              background: 'bg-pink-200',
              disabled: 'bg-green-200',
              text: 'text-red-600',
              textStyle: 'italic',
            },
          },
          {
            data: [
              { key: 'id', value: 10 },
              {
                key: 'client_name',
                value: 'Artur Ramiro Furtado',
              },
              {
                key: 'phone',
                value: '(47) 98881-7898',
              },
              {
                key: 'code',
                value: 2,
              },
            ],
          },
        ],
      },
    },
  },
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
