import React, { ReactElement, memo } from "react";
import { TableOptionType, TableHeaderData } from "../../../types";
import { TableRow } from "../";

interface TableHeadProps {
  cssClasses?: string[];
  mobileHeader?: string;
  selectType?: TableOptionType | undefined;
  headerData?: TableHeaderData;
}

const TableHead = ({
  cssClasses,
  mobileHeader,
  selectType,
  headerData
}: TableHeadProps): ReactElement | null => {
  const componentClasses = cssClasses
    ? ["table-head", ...cssClasses].join(" ")
    : "table-head";

  return (
    <thead className={componentClasses}>
      {(mobileHeader || (!mobileHeader && selectType)) && (
        <TableRow mobileHeader={mobileHeader} selectType={selectType} />
      )}
      {headerData && (
        <TableRow headerData={headerData} selectType={selectType} />
      )}
    </thead>
  );
};

export default memo(TableHead);
