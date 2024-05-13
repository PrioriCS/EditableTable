import { BinocularsFill, Search } from 'react-bootstrap-icons';
import EditableTable from '../Components/Table/EditableTable';

export default {
  title: 'EditableTable',
  component: EditableTable,
};

const update = (value) => {
  console.log(value);
};

const data = {
  head: {
    columns: [{ primaryKey: true, value: 'ID' }, { value: 'Nome do Cliente' }, { value: 'Telefone' }],
  },
  body: {
    values: [
      {
        data: [
          { key: 'id', value: '1', editable: false },
          {
            key: 'client_name',
            value: 'Bernardo Magueta Kowalsky',
            editable: true,
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
            editable: false,
            personalized: false,
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
    onConfirm: update,
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

const dataWithStyle = {
  table: {
    style: {
      border: 'border-red-800',
    },
    scrollX: true,
    scrollY: true,
    scrollMaxHeight: 'max-h-40',
  },
  searchBar: {
    bar: {
      style: {
        rounded: 'rounded-full',
        border: 'border-red-300 focus:border-red-300',
        text: 'text-red-600',
        placeholder: 'placeholder:text-red-100',
        background: 'bg-cyan-100',
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
    saveButton: {
      style: {
        rounded: 'rounded-md',
        border: 'border-pink-300',
        background: 'bg-yellow-200',
        text: 'text-orange-600',
      },
      icon: {
        component: BinocularsFill,
        style: {
          text: 'text-purple-600',
          size: 'text-xl',
        },
      },
    },
    style: {
      background: 'bg-green-50',
      border: 'border-amber-300',
      rounded: 'rounded-xl',
    },
    separated: true,
  },
  head: {
    columns: [{ primaryKey: true, value: 'ID' }, { value: 'Nome do Cliente' }, { value: 'Telefone' }],
    style: {
      background: 'bg-red-100',
      border: 'border-red-800',
      text: 'text-green-600',
      font: 'font-thin',
      size: 'text-6xl',
    },
  },
  body: {
    values: [
      {
        data: [
          { key: 'id', type: 'number', value: '1', editable: false },
          {
            key: 'client_name',
            value: 'Bernardo Magueta Kowalsky',
            editable: true,
            type: 'text',
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
            editable: false,
            personalized: true,
            component: Personalized,
            functions: { test },
          },
        ],
      },
      {
        data: [
          { key: 'id', value: '2', editable: false },
          {
            key: 'client_name',
            value: 'Artur Ramiro Furtado',
            editable: true,
          },
          {
            key: 'phone',
            value: '(47) 98881-7898',
            editable: false,
            personalized: true,
            component: Personalized,
            functions: { test },
          },
        ],
      },
    ],
    style: {
      background: 'bg-yellow-100',
      disabled: 'bg-yellow-200',
      border: 'border-blue-700',
      text: 'text-purple-600',
      size: 'text-4xl',
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
    separated: true,
  },
};

export const WithStyle = {
  args: {
    primary: false,
    data: dataWithStyle,
  },
};
