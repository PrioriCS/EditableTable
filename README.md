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

  |    Prop     |                        Descrição                        |  Tipo   | Obrigatório |
  | :---------: | :-----------------------------------------------------: | :-----: | :---------: |
  |   columns   |          Dados que formam as colunas da tabela          |  Array  |    true     |
  | initialData |                Dados iniciais da tabela                 |  Array  |    true     |
  |  canSelect  |       Define se as linhas podem ser selecionáveis       | Boolean |    false    |
  |  selectKey  | Define a chave que será selecionada nas linhas (Ex: ID) | String  |    false    |
  | minPerPage  |        Mínimo de itens por página, 20 por padrão        | number  |    false    |

### Table

- **Descrição:** Componente principal que encapsula a tabela.
- **Props:**

|      Prop       |                                      Descrição                                      |  Tipo   | Obrigatório |
| :-------------: | :---------------------------------------------------------------------------------: | :-----: | :---------: |
|    className    |               Estilização da DIV que engloba a tag `<table></table>`                | String  |    false    |
|     scrollY     |  Define se terá scroll na vertical ou a tabela será infinita, por padrão é `false`  | Boolean |    false    |
|     scrollX     | Define se terá scroll na horizontal ou a tabela será limitada, por padrão é `false` | Boolean |    false    |
| scrollMinHeight |    Altura mínima para que o scroll na vertical apareça, por padrão é `max-h-96`     | String  |    false    |

### SearchBar

- **Descrição:** Barra de pesquisa integrada.
- **Props:**

|      Prop      |                                                         Descrição                                                          |   Tipo    | Obrigatório |
| :------------: | :------------------------------------------------------------------------------------------------------------------------: | :-------: | :---------: |
|   className    |                                               Estilização da `div` principal                                               |  String   |    false    |
| inputClassName |                                             Estilização do `input` de pesquisa                                             |  String   |    false    |
| iconClassName  |                                         Estilização do ícone do input de pesquisa                                          |  String   |    false    |
|   filterKey    | Chave para o filtro, exemplo: `value`, logo, o filtro funcionará para todo `value` que for igual ao que o usuário escrever |  String   |    false    |
|  placeholder   |                          Placeholder do input, caso queira alterar, por padrão é `'Pesquisar...'`                          |  String   |    false    |
|      icon      |         Ícone do input de pesquisa, caso queira alterar para se enquadrar na lib de ícones utilizada pelo projeto          | Component |    false    |
|     right      |                     Componente que queira colocar à direita do input de pesquisa (Ex: Botão com Ação)                      | Component |    false    |

### Head

- **Descrição:** Define o cabeçalho da tabela.
- **Props:**

|          Prop          |                                  Descrição                                   |  Tipo  | Obrigatório |
| :--------------------: | :--------------------------------------------------------------------------: | :----: | :---------: |
|     tHeadClassName     |                          Estilização da tag `thead`                          | String |    false    |
|     tRowClassName      |                           Estilização da tag `tr`                            | String |    false    |
|      thClassName       |                           Estilização da tag `th`                            | String |    false    |
| tHeadCheckboxClassName | Estilização da tag `th` que engloba a Checkbox de Selecionar todas as linhas | String |    false    |
|   checkboxClassName    |            Estilização da Checkbox de Selecionar todas as linhas             | String |    false    |

### Body

- **Descrição:** Renderiza as linhas e células da tabela.
- **Props:**

|          Prop          |                              Descrição                               |  Tipo  | Obrigatório |
| :--------------------: | :------------------------------------------------------------------: | :----: | :---------: |
|     tBodyClassName     |                      Estilização da tag `tbody`                      | String |    false    |
| tDataCheckboxClassName | Estilização da tag `td` que engloba a Checkbox de Selecionar a Linha | String |    false    |
|   checkboxClassName    |            Estilização da Checkbox de Selecionar a Linha             | String |    false    |

## Configuração das Colunas

|     Prop     |                                           Descrição                                            |       Tipo       | Obrigatório |
| :----------: | :--------------------------------------------------------------------------------------------: | :--------------: | :---------: |
|     key      |                                        Chave da Coluna                                         | String or Number |    true     |
|    title     |                                        Título da Coluna                                        |      String      |    false    |
|    width     |                                       Largura da Coluna                                        |      String      |    false    |
|   editable   |                             Define se o dado será editável ou não                              |     Boolean      |    true     |
|    money     |                         Define se o dado terá formatação para dinheiro                         |     Boolean      |    false    |
|     date     |                           Define se o dado terá formatação para data                           |     Boolean      |    false    |
| personalized |                Define se o dado será renderizado em um componente personalizado                |     Boolean      |    false    |
|  component   |                               Define o componente personalizado                                |    Component     |    false    |
|    props     | Passa props para o componente personalizado, por exemplo algum dado importante ou algo do tipo |      Object      |    false    |
|  functions   |                         Passa funções para o componente personalizado                          |      Array       |    false    |
|     type     |                              Tipo do input quando possível editar                              |      String      |    false    |
|    format    |                                        Formato da data                                         |      String      |    false    |

## Exemplo de Coluna com Personalized

```jsx
{
    key: 'nmusuario',
    title: 'Nome',
    personalized: true,
    component: CustomInput,
    props: { placeholder: 'Digite um nome' },
}
```

## Estrutura dos Valores da Tabela

```jsx
[
    {
        data: [
           { key: String, value: any, className: String, tDataClassName: String} ,
        ],
        tRowClassName: String;
    }
]
```

|      Prop      |                                      Descrição                                       |       Tipo       | Obrigatório |
| :------------: | :----------------------------------------------------------------------------------: | :--------------: | :---------: |
|      data      | Array com um ou mais objetos que contemplam os valores que serão mostrados na tabela |      Array       |    true     |
|      key       |                                    Chave da Linha                                    | String or Number |    true     |
|     value      |                                    Valor da Linha                                    |       any        |    true     |
|   className    |                 Estilização da tag `input` da Linha quando editável                  |      String      |    false    |
| tDataClassName |                               Estilização da tag `td`                                |      String      |    false    |
| tRowClassName  |                               Estilização da tag `tr`                                |      String      |    false    |

## Dados Importantes

### Linhas Selecionadas

- **Descrição:** Array com os valores selecionados referentes a `selectKey`
- **Exemplo:**

```jsx
import { useTableContext } from 'priorics-table';

const { selected } = useTableContext();
console.log(selected);

//Output: [1, 2, 3, 4, 5];
```

### Valores Editados

- **Descrição:** Array com os valores editados na Tabela
- **Exemplo:**

```jsx
import { useTableContext } from 'priorics-table';

const { editedData } = useTableContext();
console.log(editedData);

/* 
Output: 

[
    {
        cdpessoa: 1,
        nmusuario: 'Rafael Silva',
        endereco: 'Rua 1401, 100',
        idade: 23,
        aniversario: '2001-02-04',
        salario: 2400,
    }
];
*/
```

## Limpar Dados

Para limpar dados, o `TableContext` disponibiliza os `sets` para realizar as ações quando o Dev quiser, por exemplo logo após atualizar os dados, limpar o array `editedData`

```jsx
import { useTableContext } from 'priorics-table';

const { setEditedData, setSelected, setData } = useTableContext();

setEditedData([]); //Zera o array de dados editados
setSelected([]); //Zera o array de linhas selecionadas

const newData = [...];
setData(newData); //Define os dados da tabela com novos
```
