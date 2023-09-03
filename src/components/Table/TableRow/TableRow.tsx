import React, { ReactElement, memo } from "react";
import { TableOptionType, TableHeaderData } from "../../../types";
import { TableColumn, TableOption } from "../";

type RowData = Record<string, string | number | boolean>;

interface TableRowProps {
  cssClasses?: string[];
  id?: string | undefined;
  mobileHeader?: string;
  collapseCol?: boolean;
  selectType?: TableOptionType;
  isSelected?: boolean;
  headerData?: TableHeaderData;
  rowData?: RowData;
}

const TableRow = ({
  cssClasses,
  id,
  mobileHeader,
  collapseCol,
  selectType,
  isSelected,
  headerData,
  rowData
}: TableRowProps): ReactElement | null => {
  let componentClassesArr = ["table-row"];

  if (mobileHeader) {
    componentClassesArr.push("mobile-header");
  }

  if (selectType) {
    componentClassesArr.push("has-selection");
  }

  if (isSelected) {
    componentClassesArr.push("selected");
  }

  if (cssClasses) {
    componentClassesArr = [...componentClassesArr, ...cssClasses];
  }

  const componentClasses = componentClassesArr.join(" ");

  return (
    <tr className={componentClasses} data-row-id={id ? id : "head"}>
      {mobileHeader && (
        <>
          {selectType && (
            <TableOption
              type={selectType}
              rowId={id ? id : "all-mobile"}
              isChecked={isSelected ? isSelected : false}
            />
          )}
          <TableColumn content={mobileHeader} />
        </>
      )}
      {headerData && !rowData && (
        <>
          {selectType && (
            <TableOption
              type={selectType}
              rowId={id ? id : "all"}
              isChecked={isSelected ? isSelected : false}
            />
          )}
          {Object.keys(headerData).map((headerKey, key) => {
            return (
              <TableColumn
                key={key}
                content={headerData[headerKey].title}
                colName={headerKey}
                sortable={headerData[headerKey].sortable}
                isHeader={true}
                isDate={
                  headerData[headerKey].isDate
                    ? headerData[headerKey].isDate
                    : false
                }
              />
            );
          })}
        </>
      )}
      {rowData && (
        <>
          {selectType && (
            <TableOption
              type={selectType}
              rowId={id as string}
              isChecked={isSelected ? isSelected : false}
            />
          )}
          {Object.keys(rowData).map((dataRowKey, colKey) => (
            <TableColumn
              key={colKey}
              collapseCol={collapseCol}
              headerTitle={headerData?.[dataRowKey].title}
              content={rowData[(dataRowKey as unknown) as number]}
              isDate={headerData?.[dataRowKey].isDate}
            />
          ))}
        </>
      )}
    </tr>
  );
};

export default memo(TableRow);
