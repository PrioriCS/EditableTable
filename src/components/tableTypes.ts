export type Style = {
  rounded?: string;
  border?: string;
  focus?: string;
  text?: string;
  placeholder?: string;
  background?: string;
  size?: string;
  font?: string;
  disabled?: string;
  textStyle?: string;
};

export type Icon = {
  component?: React.ComponentType<{ className?: string }>;
  style?: Style;
};

export type SaveButton = {
  icon?: Icon;
  style?: Style;
  text?: string;
};

export type ConfirmRows = {
  icon?: Icon;
  style?: Style;
  text?: string;
};

export type Bar = {
  icon?: Icon;
  style?: Style;
  placeholder?: string;
};

export type SearchBar = {
  separated?: boolean;
  saveButton?: SaveButton;
  confirmRows?: ConfirmRows;
  bar?: Bar;
  style?: Style;
  onSearch?: Function;
  onRight?: React.ComponentType;
};

export type Table = {
  transferableRow?: boolean;
  withoutToolbar?: boolean;
  withoutPagination?: boolean;
  scrollY?: boolean;
  scrollX?: boolean;
  transferencyKey?: string;
  scrollMinHeight?: string;
  onConfirm?: Function;
  rowsSelectionConfirm?: Function;
  onRowDoubleClick?: Function;
  style?: Style;
};

export type SelectOptions = {
  code: number | string;
  name: string;
};

export type Columns = {
  disabled?: boolean;
  value?: number | string | boolean;
  primaryKey?: string | number;
  key?: string | number;
  type?: string;
  selectText?: string;
  selectKey?: string;
  selectView?: string;
  format?: string;
  money?: boolean;
  select?: boolean;
  selectPrimaryKey?: boolean;
  canClearSelect?: boolean;
  editable?: boolean;
  date?: boolean;
  personalized?: boolean;
  component?: React.ReactNode;
  functions?: Function[];
  options?: SelectOptions[];
};

export type RowItem = {
  key?: string | number;
  value?: string | number | boolean | Date | any;
};

export type Row = {
  data?: RowItem[];
  style?: Style;
};

export type Head = {
  columns?: Columns[];
};

export type TableHeadProps = {
  index?: number;
  columns?: Columns[];
  column?: Columns;
  style?: Style;
  checkboxOnly?: boolean;
  children?: React.ReactNode;
};

export type Pagination = {
  separated?: boolean;
};

export type BodyValues = Row[];

export type Body = {
  values?: BodyValues;
};

export type BodyHeader = {
  data?: Body;
  columns?: Columns[];
  edit?: Function;
  transferableRow?: boolean;
  transferencykey?: string;
  handleSelectRow?: Function;
  onRowDoubleClick?: Function;
  selected?: any[];
};

export type EditableDataType = {
  table?: Table;
  head?: Head;
  pagination?: Pagination;
  searchBar?: SearchBar;
  body?: Body;
};

export type DataType = {
  data?: {
    table?: Table;
    head?: Head;
    pagination?: Pagination;
    searchBar?: SearchBar;
  };
};
