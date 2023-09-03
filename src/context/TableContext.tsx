import React from "react";
import { createContext } from "react";

type RowSelected = string;

type RowsSelected = Array<RowSelected>;

type SortByAttribute = {
  attribute: string;
  order: string;
};

type TableContextType = {
  tableName: text;
  rowsSelected: RowsSelected;
  setRowsSelected: React.Dispatch<React.SetStateAction<RowsSelected>>;
  selectAll: boolean;
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
  originalTableData: Array<Record<string, string | number | boolean>>;
  storedTableData: Array<Record<string, string | number | boolean>>;
  setStoredTableData: React.Dispatch<
    React.SetStateAction<Record<string, string | number | boolean>[]>
  >;
  sortByAttribute: SortByAttribute;
  setSortByAttribute: React.Dispatch<React.SetStateAction<SortByAttribute>>;
};

export const TableContext = createContext<TableContextType | undefined>(
  undefined
);
