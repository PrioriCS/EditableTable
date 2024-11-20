type TailwindNumberValues =
  | '0'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96';

export type TSelectedIds = number | undefined;

export type TContextType = {
  children?: React.ReactNode;
  columnsData?: TColumns[];
  columns?: TColumns[];
  initialData?: TBodyValues;
  canSelect?: boolean;
  filteredData?: TBodyValues;
  editedData?: TBodyValues;
  setColumns?: Function;
  data?: TBodyValues;
  setData?: Function;
  filterData?: Function;
  selected?: TSelectedIds[];
  setSelected?: Function;
  toggleSelectAll?: Function;
  filterName?: string;
  filterId?: string;
  handleEdit?: Function;
  isAllSelected?: boolean;
  selectKey?: string;
  handleSelect?: Function;
  handleScroll?: Function;
};

export type TTableType = {
  className?: string;
  scrollY?: boolean;
  scrollX?: boolean;
  scrollMinHeight?:
    | 'max-h-auto'
    | `max-h-${TailwindNumberValues}`
    | `max-h-[${number | string}px]`
    | `max-h-[${number | string}rem]`
    | `max-h-[${number | string}em]`;
  children?: React.ReactNode;
};

export type TSearchBar = {
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  filterKey?: string;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  right?: React.ComponentType<{ className?: string }>;
};

export type TColumns = {
  key?: string | number;
  title?: string;
  width?: string;
  editable?: boolean;
  money?: boolean;
  date?: boolean;
  personalized?: boolean;
  component?: React.ReactNode;
  props?: { [key: string]: any };
  functions?: Function[];
  type?: string;
  format?: string;
};

export type THead = {
  tHeadClassName?: string;
  tRowClassName?: string;
  thClassName?: string;
  tHeadCheckboxClassName?: string;
  checkboxClassName?: string;
};

export type TRowItem = {
  key?: string | number;
  value?: any;
  className?: string;
  tDataClassName?: string;
};

export type TRow = {
  data?: TRowItem[];
  tRowClassName?: string;
};

export type TBodyValues = TRow[];

export type TBody = {
  tBodyClassName?: string;
  tDataCheckboxClassName?: string;
  checkboxClassName?: string;
};
