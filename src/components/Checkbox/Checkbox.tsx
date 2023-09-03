import React, {
  ReactElement,
  memo,
  useContext,
  useEffect,
  useRef
} from "react";
import { TableContext } from "../../context/TableContext";

interface CheckBoxProps {
  rowId: string;
  tableName: string;
  isChecked: boolean;
}

const CheckBox = ({
  rowId,
  tableName,
  isChecked
}: CheckBoxProps): ReactElement | null => {
  const {
    rowsSelected,
    setRowsSelected,
    selectAll,
    setSelectAll,
    storedTableData
  } = useContext(TableContext);

  let componentClassesArr = ["checkbox"];

  const componentClasses = componentClassesArr.join(" ");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => {
    const optionId = inputRef?.current?.dataset.optionId;
    if (optionId !== "all") {
      if (rowsSelected.includes(rowId)) {
        const updatedRowsSelected = rowsSelected.filter(
          (id: string) => id !== optionId
        );
        setRowsSelected([...updatedRowsSelected]);
      } else {
        setRowsSelected([...rowsSelected, optionId]);
      }
    } else {
      if (selectAll) setRowsSelected([]);
      setSelectAll(!selectAll);
    }
  };

  useEffect(() => {
    if (selectAll) setRowsSelected([...Object.keys(storedTableData)]);
  }, [selectAll, setRowsSelected, storedTableData]);

  useEffect(() => {
    const doSelectAll = () => {
      setSelectAll(rowsSelected.length === storedTableData.length);
    };

    doSelectAll();
  }, [rowId, setSelectAll, selectAll, rowsSelected, storedTableData.length]);

  return (
    <>
      <input
        ref={inputRef}
        type="checkbox"
        className={componentClasses}
        onChange={handleSelect}
        data-option-id={rowId === "all-mobile" ? "all" : rowId}
        id={tableName + "-checkbox-" + rowId}
        checked={
          rowId === "all-mobile" || rowId === "all" ? selectAll : isChecked
        }
      />
      <label htmlFor={tableName + "-checkbox-" + rowId}></label>
    </>
  );
};

export default memo(CheckBox);
