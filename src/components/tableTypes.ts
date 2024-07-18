export type Style = {
  rounded?: string;
  border?: string;
  focus?: string;
  text?: string;
  placeholder?: string;
  background?: string;
  size?: string;
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

export type DataType = {
  data: {
    table?: Table;
    searchBar?: SearchBar;
  };
};
