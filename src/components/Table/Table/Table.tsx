import React, { ReactElement, memo, useEffect, useState } from "react";
import { TableData } from "../../../types";
import { TableContext } from "../../../context/TableContext";
import { TableBody, TableHead } from "../";
import "../../../assets/styles/styles.scss";

interface TableProps {
  cssClasses?: string[];
  tableData: TableData;
}

type RowSelected = string;

type RowsSelected = Array<RowSelected>;

const Table = ({ cssClasses, tableData }: TableProps): ReactElement | null => {
  const [rowsSelected, setRowsSelected] = useState([] as RowsSelected);
  const [selectAll, setSelectAll] = useState(false);

  const [sortByAttribute, setSortByAttribute] = useState({
    attribute: "",
    order: ""
  });
  const [originalTableData, setOriginalTableData] = useState(
    [] as Array<Record<string, string | number | boolean>>
  );
  const [storedTableData, setStoredTableData] = useState(
    [] as Array<Record<string, string | number | boolean>>
  );

  const {
    tableName,
    collapseCol,
    mobileHeader,
    selectType,
    headers,
    data
  } = tableData;

  useEffect(() => {
    setRowsSelected([]);
    setSelectAll(false);
    setOriginalTableData(data);
    setStoredTableData(data);
  }, [data]);

  useEffect(() => {
    setRowsSelected([]);
    setSelectAll(false);
  }, [storedTableData]);

  let componentClassesArr = ["table"];
  if (collapseCol) {
    componentClassesArr.push("multi-col-collapse");
  }

  if (cssClasses) {
    componentClassesArr = [...componentClassesArr, ...cssClasses];
  }

  const componentClasses = componentClassesArr.join(" ");

  return (
    <table id={tableName} className={componentClasses}>
      <TableContext.Provider
        value={{
          tableName,
          rowsSelected,
          setRowsSelected,
          selectAll,
          setSelectAll,
          originalTableData,
          storedTableData,
          setStoredTableData,
          sortByAttribute,
          setSortByAttribute
        }}
      >
        {selectType ? (
          <>
            {headers && (
              <TableHead
                headerData={headers}
                mobileHeader={mobileHeader}
                selectType={selectType}
              />
            )}
            {storedTableData && (
              <TableBody
                bodyData={storedTableData}
                selectType={selectType}
                headerData={headers}
                collapseCol={collapseCol}
              />
            )}
          </>
        ) : (
          <>
            {headers && <TableHead headerData={headers} />}
            {storedTableData && (
              <TableBody bodyData={storedTableData} collapseCol={collapseCol} />
            )}
          </>
        )}
      </TableContext.Provider>
    </table>
  );
};

export default memo(Table);
