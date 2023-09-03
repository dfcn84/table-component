export type TableOptionType = "checkbox" | "radio";

export type TableHeaderData = Record<
  string,
  {
    title: string;
    sortable?: boolean;
    isDate?: boolean;
  }
>;

export type TableData = {
  tableName: string;
  collapseCol?: boolean;
  selectType?: TableOptionType;
  mobileHeader?: string;
  headers?: TableHeaderData;
  data: Array<Record<string, string | number | boolean>>;
};
