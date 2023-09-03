import React, { ReactElement, ReactNode, memo, useContext } from "react";
import { TableContext } from "../../../context/TableContext";
import { TableOptionType } from "../../../types";
import Sortable from "../../Sortable";

interface TableColumnProps {
  cssClasses?: string[];
  rowId?: string | undefined;
  colName?: string | undefined;
  selectType?: TableOptionType;
  isChecked?: boolean;
  collapseCol?: boolean;
  headerTitle?: string;
  content?: ReactNode;
  sortable?: boolean;
  isDate?: boolean;
  isHeader?: boolean;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short"
  });
};

const TableColumn = ({
  cssClasses,
  colName,
  selectType,
  collapseCol,
  headerTitle,
  content,
  sortable,
  isDate,
  isHeader
}: TableColumnProps): ReactElement | null => {
  const { sortByAttribute } = useContext(TableContext);
  const { attribute, order } = sortByAttribute;
  let formattedDate: string | boolean = false;
  let componentClassesArr = ["table-column"];

  if (selectType) {
    componentClassesArr.push("selection");
  } else {
    componentClassesArr.push("col-content");
  }

  if (cssClasses) {
    componentClassesArr = [...componentClassesArr, ...cssClasses];
  }

  const componentClasses = componentClassesArr.join(" ");

  if (content && isDate && !isHeader) {
    formattedDate = formatDate(content as string);
  }

  return (
    <td className={componentClasses}>
      {collapseCol && headerTitle && (
        <div className="table-head-label">{headerTitle}:</div>
      )}
      {formattedDate ? formattedDate : content}
      {sortable && (
        <Sortable
          sortBy={colName}
          order={attribute === colName ? order : false}
          isDate={isDate}
        />
      )}
    </td>
  );
};

export default memo(TableColumn);
