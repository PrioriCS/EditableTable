type TailwindColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';
type TailwindUniqueColor = 'transparent' | 'current' | 'black' | 'white';

type TailwindColorVariant = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
type TailwindRadiusSizeVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
type TailwindRadiusDirectionsVariant = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'br' | 'bl' | 's' | 'e';
type TailwindTextSizesVariant =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';
type TailwindWeightVariant =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';
type TailwindTextStyleVariant = 'italic' | 'not-italic';
type TailwindSizesVariant =
  | '0'
  | 'px'
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
  | '96'
  | 'auto'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5'
  | '1/6'
  | '2/6'
  | '3/6'
  | '4/6'
  | '5/6'
  | '1/12'
  | '2/12'
  | '3/12'
  | '4/12'
  | '5/12'
  | '6/12'
  | '7/12'
  | '8/12'
  | '9/12'
  | '10/12'
  | '11/12'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit';

export type TStyle = {
  rounded?:
    | 'rounded'
    | `rounded-${TailwindRadiusDirectionsVariant}`
    | `${'rounded-' | `rounded-${TailwindRadiusDirectionsVariant}-`}${TailwindRadiusSizeVariant}`;
  border?:
    | `${'border-'}${TailwindUniqueColor}`
    | `${'border-' | 'border-t-' | 'border-r-' | 'border-b-' | 'border-l-' | 'border-x-' | 'border-y-' | 'border-s-' | 'border-e-'}${TailwindColor}-${TailwindColorVariant}`;
  focus?:
    | `focus:border-${TailwindUniqueColor}`
    | `focus:${'border-' | 'border-t-' | 'border-r-' | 'border-b-' | 'border-l-' | 'border-x-' | 'border-y-' | 'border-s-' | 'border-e-'}${TailwindColor}-${TailwindColorVariant}`;
  text?: 'text-inherit' | `text-${TailwindUniqueColor}` | `text-${TailwindColor}-${TailwindColorVariant}`;
  placeholder?: string;
  background?: 'bg-inherit' | `bg-${TailwindUniqueColor}` | `bg-${TailwindColor}-${TailwindColorVariant}`;
  size?: `text-${TailwindTextSizesVariant}`;
  font?: `font-${TailwindWeightVariant}`;
  disabled?: 'bg-inherit' | `bg-${TailwindUniqueColor}` | `bg-${TailwindColor}-${TailwindColorVariant}`;
  textStyle?: `font-${TailwindTextStyleVariant}`;
  width?: `w-${TailwindSizesVariant}`;
  height?: `h-${TailwindSizesVariant}`;
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
  width?: string;
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
  resizedWidth?: number;
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
  linesHeight?: string;
};

export type TTableHeadProps = {
  index?: number;
  columns?: TColumns[];
  column?: TColumns;
  style?: TStyle;
  checkboxOnly?: boolean;
  children?: React.ReactNode;
  handleChangeColumnWidth?: Function;
  lineHeight?: string;
};

export type TBodyValues = TRow[];

export type TBody = {
  values?: TBodyValues;
  style?: TStyle;
  checkbox?: {
    style?: TStyle;
  };
  linesHeight?: string;
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
