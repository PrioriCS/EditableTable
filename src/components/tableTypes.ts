export type TStyle = {
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
  width?: string;
  height?: string;
};

export type TIcon = {
  component?: React.ComponentType<{ className?: string }>;
  style?: TStyle;
};

export type TSaveButton = {
  icon?: TIcon;
  style?: TStyle;
  text?: string;
};

export type TConfirmRows = {
  icon?: TIcon;
  style?: TStyle;
  text?: string;
};

export type TBar = {
  icon?: TIcon;
  style?: TStyle;
  placeholder?: string;
};

export type TSearchBar = {
  separated?: boolean;
  saveButton?: TSaveButton;
  confirmRows?: TConfirmRows;
  bar?: TBar;
  style?: TStyle;
  onSearch?: Function;
  onRight?: React.ComponentType;
};

export type TTable = {
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
  style?: TStyle;
};

export type TSelectOptions = {
  code: number | string;
  name: string;
};

export type TColumns = {
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
  options?: TSelectOptions[];
};

export type TRowItem = {
  key?: string | number;
  value?: any;
};

export type TRow = {
  data?: TRowItem[];
  style?: TStyle;
};

export type THead = {
  columns?: TColumns[];
  style?: TStyle;
  checkbox?: {
    style?: TStyle;
  };
};

export type TTableHeadProps = {
  index?: number;
  columns?: TColumns[];
  column?: TColumns;
  style?: TStyle;
  checkboxOnly?: boolean;
  children?: React.ReactNode;
};

export type TBodyValues = TRow[];

export type TBody = {
  values?: TBodyValues;
  style?: TStyle;
  checkbox?: {
    style?: TStyle;
  };
};

export type TBodyHeader = {
  data?: TBody;
  columns?: TColumns[];
  edit?: Function;
  transferableRow?: boolean;
  transferencykey?: string;
  handleSelectRow?: Function;
  onRowDoubleClick?: Function;
  selected?: any[];
};

export type TPaginationIcon = {
  fullLeft?: {
    component: React.ReactNode;
  };
  left?: {
    component: React.ReactNode;
  };
  right?: {
    component: React.ReactNode;
  };
  fullRight?: {
    component: React.ReactNode;
  };
  size?: string;
};

export type TPagination = {
  separated?: boolean;
  style?: TStyle;
  icons?: TPaginationIcon;
  lastPage?: number;
  currentPage?: number;
  handleChangePage?: Function;
};

export type TEditableDataType = {
  table?: TTable;
  head?: THead;
  pagination?: TPagination;
  searchBar?: TSearchBar;
  body?: TBody;
};

export type TDataType = {
  data?: {
    table?: TTable;
    searchBar?: TSearchBar;
    head?: THead;
    body?: TBody;
    pagination?: TPagination;
  };
};
