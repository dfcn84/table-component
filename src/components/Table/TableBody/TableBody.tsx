import React, { ReactElement, memo, useContext } from "react";
import { TableOptionType, TableHeaderData } from "../../../types";
import { TableRow } from "../";
import { TableContext } from "../../../context/TableContext";
import { TableColCssVar } from "../../../interface/TableColCssVar";

interface TableBodyProps {
  cssClasses?: string[];
  data?: Record<string, string | number | boolean>[];
  selectType?: TableOptionType | undefined;
  collapseCol?: boolean;
  headerData?: TableHeaderData;
  bodyData?: Array<Record<string, string | number | boolean>>;
}

const TableBody = ({
  cssClasses,
  selectType,
  collapseCol,
  headerData,
  bodyData
}: TableBodyProps): ReactElement | null => {
  const { rowsSelected } = useContext(TableContext);

  const componentClasses = cssClasses
    ? ["table-body", ...cssClasses].join(" ")
    : "table-body";

  const colCount =
    bodyData && bodyData?.length > 0 ? Object.keys(bodyData[0]).length : 1;

  return (
    <tbody
      className={componentClasses}
      style={{ "--table-col": colCount } as TableColCssVar}
    >
      {bodyData
        ? bodyData.map(
            (rowData: Record<string, string | number | boolean>, key) => (
              <TableRow
                key={key}
                id={key.toString()}
                collapseCol={collapseCol}
                headerData={headerData}
                rowData={rowData}
                selectType={selectType}
                isSelected={rowsSelected.includes(key.toString())}
              />
            )
          )
        : "There is no row data"}
    </tbody>
  );
};

export default memo(TableBody);
