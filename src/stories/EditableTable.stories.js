import { Table, Head, Body, SearchBar } from '../components';
import React from 'react';

export default {
  title: 'Table',
  component: Table,
};

const Template = (args) => (
  <div className='shadow-gray-600 drop-shadow-[0_0_8px_rgba(30,64,175,0.15)] w-full'>
    <SearchBar />
    <Table {...args} className='rounded-b-xl' />
  </div>
);

const columns = [
  { key: 'nmusuario', title: 'Nome', width: '50%', editable: true },
  { key: 'endereco', title: 'Endereço', width: '40%', editable: true },
  { key: 'idade', title: 'Idade', width: '10%' },
  { key: 'aniversario', title: 'Aniversário', width: '10%', date: true },
  { key: 'salario', title: 'Salário', width: '10%', money: true },
];

const values = [
  {
    data: [
      { key: 'nmusuario', value: 'Bernardo Magueta Kowalsky' },
      { key: 'endereco', value: 'Rua Uruguai, 233' },
      { key: 'idade', value: 23 },
      { key: 'aniversario', value: '2001-02-04' },
      { key: 'salario', value: 2400 },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Head columns={columns} />
      <Body values={values} columns={columns} />
    </>
  ),
};
