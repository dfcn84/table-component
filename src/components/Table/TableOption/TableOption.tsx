import React, { ReactElement, memo, useContext } from "react";
import { TableOptionType } from "../../../types";
import { TableContext } from "../../../context/TableContext";
import RadioButton from "../../RadioButton";
import Checkbox from "../../Checkbox";
import TableColumn from "../TableColumn";

interface TableOptionProps {
  type: TableOptionType;
  rowId: string;
  isChecked: boolean;
}

const TableOption = ({
  type,
  rowId,
  isChecked
}: TableOptionProps): ReactElement | null => {
  const { tableName } = useContext(TableContext);
  if (type === "checkbox") {
    const tableOption = (
      <Checkbox rowId={rowId} tableName={tableName} isChecked={isChecked} />
    );
    return <TableColumn cssClasses={["selection"]} content={tableOption} />;
  } else if (type === "radio") {
    if (rowId && rowId !== "all" && rowId !== "all-mobile") {
      const tableOption = (
        <RadioButton
          rowId={rowId}
          tableName={tableName}
          isChecked={isChecked}
        />
      );
      return <TableColumn cssClasses={["selection"]} content={tableOption} />;
    }
  }

  return <TableColumn cssClasses={["selection"]} />;
};

export default memo(TableOption);
