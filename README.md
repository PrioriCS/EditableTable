# Tabela Editável

Este componente de tabela foi projetado para ser flexível e personalizável, permitindo edição de valores, formatação específica (como moeda ou datas), e suporte a pesquisa e seleção de linhas. A tabela é implementada com base em um provedor de contexto, garantindo fácil manipulação de dados e estado.

## Exemplo de Uso

```jsx
import { Table, Head, Body, SearchBar, TableProvider } from 'priorics-table';

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
      { key: 'cdpessoa', value: 1 },
      { key: 'nmusuario', value: 'Rafael Santos' },
      { key: 'endereco', value: 'Rua 1401, 100' },
      { key: 'idade', value: 23 },
      { key: 'aniversario', value: '2001-02-04' },
      { key: 'salario', value: 2400 },
    ],
  },
];

export default function EditableTable() {
  return (
    <TableProvider columns={columns} initialData={values} canSelect selectKey='cdpessoa'>
      <SearchBar filterKey='value' />
      <Table className='rounded-b-xl' scrollY>
        <Head columns={columns} />
        <Body columns={columns} />
      </Table>
    </TableProvider>
  );
}
```

## Componentes e Props

### TableProvider

- **Descrição:** Provê contexto para gerenciar estado da tabela.
- **Props:**
  | Prop | Descrição | Tipo | Obrigatório |
  |:---------:|:--------------:|:---------:|:----------------:|
  | columns | Dados que formam as colunas da tabela | Array | true |
  | initialData | Dados iniciais da tabela | Array | true |
  | canSelect | Define se as linhas podem ser selecionáveis | Boolean | false |
  | selectKey | Define a chave que será selecionada nas linhas (Ex: ID) | String | false |
