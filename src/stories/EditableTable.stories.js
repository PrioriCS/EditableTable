import { Table, Head, Body, SearchBar, TableProvider } from '../components';
import React from 'react';

export default {
  title: 'Table',
  component: Table,
};

const values = [
  {
    data: [
      { key: 'cdpessoa', value: 1 },
      { key: 'nmusuario', value: 'Rafael Santos' },
      { key: 'endereco', value: 'Rua 1401, 100' },
      { key: 'idade', value: 23 },
      { key: 'aniversario', value: '2001-02-04' },
      { key: 'salario', value: 2400 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 2 },
      { key: 'nmusuario', value: 'Bruno Silva de Souza' },
      { key: 'endereco', value: 'Rua Márcio Cunha, 233' },
      { key: 'idade', value: 46 },
      { key: 'aniversario', value: '1978-09-26' },
      { key: 'salario', value: 5000 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 3 },
      { key: 'nmusuario', value: 'Felipe Alexandre Bastos' },
      { key: 'endereco', value: 'Rua Itatuí, 305' },
      { key: 'idade', value: 69 },
      { key: 'aniversario', value: '1955-05-25' },
      { key: 'salario', value: 5000 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 4 },
      { key: 'nmusuario', value: 'Maria José Oliveira' },
      { key: 'endereco', value: 'Rua São João, 100' },
      { key: 'idade', value: 33 },
      { key: 'aniversario', value: '1991-11-15' },
      { key: 'salario', value: 3200 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 5 },
      { key: 'nmusuario', value: 'Carlos Eduardo Silva' },
      { key: 'endereco', value: 'Rua Blumenau, 550' },
      { key: 'idade', value: 29 },
      { key: 'aniversario', value: '1995-04-12' },
      { key: 'salario', value: 3800 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 6 },
      { key: 'nmusuario', value: 'Lúcia Maria Costa' },
      { key: 'endereco', value: 'Rua Rio de Janeiro, 233' },
      { key: 'idade', value: 54 },
      { key: 'aniversario', value: '1970-07-18' },
      { key: 'salario', value: 4200 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 7 },
      { key: 'nmusuario', value: 'Jorge Martins' },
      { key: 'endereco', value: 'Rua Santos Dumont, 45' },
      { key: 'idade', value: 39 },
      { key: 'aniversario', value: '1985-10-08' },
      { key: 'salario', value: 2900 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 8 },
      { key: 'nmusuario', value: 'Ana Paula Lima' },
      { key: 'endereco', value: 'Rua Presidente Vargas, 777' },
      { key: 'idade', value: 27 },
      { key: 'aniversario', value: '1997-02-22' },
      { key: 'salario', value: 2900 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 9 },
      { key: 'nmusuario', value: 'Fabiano Rocha' },
      { key: 'endereco', value: 'Rua Catuçaba, 12' },
      { key: 'idade', value: 41 },
      { key: 'aniversario', value: '1983-01-09' },
      { key: 'salario', value: 3500 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 10 },
      { key: 'nmusuario', value: 'Paula Costa' },
      { key: 'endereco', value: 'Rua Independência, 320' },
      { key: 'idade', value: 36 },
      { key: 'aniversario', value: '1988-05-30' },
      { key: 'salario', value: 2900 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 11 },
      { key: 'nmusuario', value: 'Ricardo Santana' },
      { key: 'endereco', value: 'Rua Santa Catarina, 5' },
      { key: 'idade', value: 51 },
      { key: 'aniversario', value: '1973-08-01' },
      { key: 'salario', value: 4100 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 12 },
      { key: 'nmusuario', value: 'Marina Souza' },
      { key: 'endereco', value: 'Rua Caravaggio, 333' },
      { key: 'idade', value: 60 },
      { key: 'aniversario', value: '1964-03-23' },
      { key: 'salario', value: 4800 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 13 },
      { key: 'nmusuario', value: 'Tatiane Almeida' },
      { key: 'endereco', value: 'Rua Buenos Aires, 134' },
      { key: 'idade', value: 25 },
      { key: 'aniversario', value: '1999-09-09' },
      { key: 'salario', value: 3300 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 14 },
      { key: 'nmusuario', value: 'Rodrigo Martins' },
      { key: 'endereco', value: 'Rua Bahia, 222' },
      { key: 'idade', value: 44 },
      { key: 'aniversario', value: '1980-06-18' },
      { key: 'salario', value: 5000 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 15 },
      { key: 'nmusuario', value: 'Isabela Silva' },
      { key: 'endereco', value: 'Rua São Paulo, 1100' },
      { key: 'idade', value: 31 },
      { key: 'aniversario', value: '1993-12-11' },
      { key: 'salario', value: 2900 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 16 },
      { key: 'nmusuario', value: 'Luís Henrique Costa' },
      { key: 'endereco', value: 'Rua São Francisco, 59' },
      { key: 'idade', value: 38 },
      { key: 'aniversario', value: '1986-05-14' },
      { key: 'salario', value: 3900 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 17 },
      { key: 'nmusuario', value: 'Mariana Martins' },
      { key: 'endereco', value: 'Rua Leão XIII, 54' },
      { key: 'idade', value: 28 },
      { key: 'aniversario', value: '1996-11-30' },
      { key: 'salario', value: 4000 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 18 },
      { key: 'nmusuario', value: 'Leonardo Souza' },
      { key: 'endereco', value: 'Rua Maranhão, 1500' },
      { key: 'idade', value: 52 },
      { key: 'aniversario', value: '1972-06-24' },
      { key: 'salario', value: 4800 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 19 },
      { key: 'nmusuario', value: 'Carlos Alberto Silva' },
      { key: 'endereco', value: 'Rua Curitiba, 55' },
      { key: 'idade', value: 39 },
      { key: 'aniversario', value: '1985-02-03' },
      { key: 'salario', value: 4100 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 20 },
      { key: 'nmusuario', value: 'Juliana Pereira' },
      { key: 'endereco', value: 'Rua Rio Grande, 800' },
      { key: 'idade', value: 34 },
      { key: 'aniversario', value: '1990-01-18' },
      { key: 'salario', value: 3600 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 21 },
      { key: 'nmusuario', value: 'Victor Hugo Almeida' },
      { key: 'endereco', value: 'Rua das Palmeiras, 66' },
      { key: 'idade', value: 45 },
      { key: 'aniversario', value: '1979-04-03' },
      { key: 'salario', value: 5200 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 22 },
      { key: 'nmusuario', value: 'Roberta Oliveira' },
      { key: 'endereco', value: 'Rua Vitória, 190' },
      { key: 'idade', value: 28 },
      { key: 'aniversario', value: '1996-06-29' },
      { key: 'salario', value: 3300 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 23 },
      { key: 'nmusuario', value: 'Tiago Rodrigues' },
      { key: 'endereco', value: 'Rua Anhangüera, 120' },
      { key: 'idade', value: 36 },
      { key: 'aniversario', value: '1988-07-12' },
      { key: 'salario', value: 4600 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 24 },
      { key: 'nmusuario', value: 'Aline Costa' },
      { key: 'endereco', value: 'Rua Afonso Pena, 76' },
      { key: 'idade', value: 40 },
      { key: 'aniversario', value: '1984-02-10' },
      { key: 'salario', value: 5200 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 25 },
      { key: 'nmusuario', value: 'Ricardo Martins' },
      { key: 'endereco', value: 'Rua do Comércio, 453' },
      { key: 'idade', value: 50 },
      { key: 'aniversario', value: '1974-11-22' },
      { key: 'salario', value: 5100 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 26 },
      { key: 'nmusuario', value: 'Patrícia Almeida' },
      { key: 'endereco', value: 'Rua Paraíba, 320' },
      { key: 'idade', value: 43 },
      { key: 'aniversario', value: '1981-08-13' },
      { key: 'salario', value: 4200 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 27 },
      { key: 'nmusuario', value: 'João Pedro Silva' },
      { key: 'endereco', value: 'Rua Conde, 654' },
      { key: 'idade', value: 35 },
      { key: 'aniversario', value: '1989-09-17' },
      { key: 'salario', value: 4800 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 28 },
      { key: 'nmusuario', value: 'Luciana Lima' },
      { key: 'endereco', value: 'Rua Maracanaú, 20' },
      { key: 'idade', value: 38 },
      { key: 'aniversario', value: '1986-01-04' },
      { key: 'salario', value: 4900 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 29 },
      { key: 'nmusuario', value: 'Eduardo Barbosa' },
      { key: 'endereco', value: 'Rua Oliveira, 9' },
      { key: 'idade', value: 32 },
      { key: 'aniversario', value: '1992-04-21' },
      { key: 'salario', value: 3700 },
    ],
  },
  {
    data: [
      { key: 'cdpessoa', value: 30 },
      { key: 'nmusuario', value: 'Carla Maria Costa' },
      { key: 'endereco', value: 'Rua Nova, 442' },
      { key: 'idade', value: 29 },
      { key: 'aniversario', value: '1995-03-14' },
      { key: 'salario', value: 3000 },
    ],
  },
];

const columns = [
  { key: 'nmusuario', title: 'Nome', width: '20%', editable: true },
  { key: 'endereco', title: 'Endereço', width: '20%', editable: true },
  { key: 'idade', title: 'Idade', width: '20%' },
  { key: 'aniversario', title: 'Aniversário', width: '20%', date: true },
  { key: 'salario', title: 'Salário', width: '20%', money: true },
];

const Template = (args) => (
  <TableProvider columns={columns} initialData={values} canSelect={true} selectKey='cdpessoa'>
    <SearchBar filterKey='value' />
    <Table {...args} className='rounded-b-xl' scrollY scrollX />
  </TableProvider>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Head />
      <Body />
    </>
  ),
};
