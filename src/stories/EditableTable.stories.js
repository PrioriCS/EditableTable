import { BinocularsFill, Search } from 'react-bootstrap-icons';
import EditableTable from '../Components/Table/EditableTable';

export default {
  title: 'EditableTable',
  component: EditableTable,
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

const data = {
  table: {
    style: {},
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
    style: {},
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
            personalized: true,
            component: Personalized,
            functions: { test },
          },
        ],
      },
    ],
  },
  pagination: {
    style: {},
    separated: true,
  },
};

export const Primary = {
  args: {
    primary: true,
    data: data,
  },
};

const secondData = {
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

export const Secondary = {
  args: {
    primary: true,
    data: secondData,
  },
};
