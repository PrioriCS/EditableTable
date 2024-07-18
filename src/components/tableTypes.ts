export interface IStyle {
  rounded: string | null;
  border: string | null;
  focus: string | null;
  text: string | null;
  placeholder: string | null;
  background: string | null;
  size: string | null;
}

export interface IIcon {
  component: React.ComponentType<{ className?: string }> | null;
  style: IStyle | null;
}

export interface ISaveButton {
  icon: IIcon | null;
  style: IStyle | null;
  text: string | null;
}

export interface IConfirmRows {
  icon: IIcon | null;
  style: IStyle | null;
  text: string | null;
}

export interface IBar {
  icon: IIcon | null;
  style: IStyle | null;
  placeholder: string | null;
}

export interface ISearchBar {
  separated: boolean | null;
  saveButton: ISaveButton | null;
  confirmRows: IConfirmRows | null;
  bar: IBar | null;
  style: IStyle | null;
  onSearch: Function | null;
  onRight: React.ComponentType | null;
}

export interface ITable {
  transferableRow: boolean | null;
  withoutToolbar: boolean | null;
  withoutPagination: boolean | null;
  scrollY: boolean | null;
  scrollX: boolean | null;
  transferencyKey: string | null;
  scrollMinHeight: string | null;
  onConfirm: Function | null;
  rowsSelectionConfirm: Function | null;
  onRowDoubleClick: Function | null;
  style: IStyle | null;
}

export interface DataType {
  data: {
    table: ITable | null;
    searchBar: ISearchBar | null;
  };
}
