import React, { ReactElement, memo, useRef, useContext } from "react";
import { TableContext } from "../../context/TableContext";

interface RadioButtonProps {
  rowId: string;
  tableName: string;
  isChecked: boolean;
}

const RadioButton = ({
  rowId,
  tableName,
  isChecked
}: RadioButtonProps): ReactElement | null => {
  const { setRowsSelected } = useContext(TableContext);
  const optionRef = useRef<HTMLInputElement>(null);
  let componentClassesArr = ["radio-button"];

  const componentClasses = componentClassesArr.join(" ");

  const handleSelect = (optionId: string) => {
    setRowsSelected([optionId]);
  };

  return (
    <>
      <input
        type="radio"
        ref={optionRef}
        className={componentClasses}
        onChange={() => handleSelect(rowId)}
        data-option-id={rowId}
        id={tableName + "-radio-" + rowId}
        checked={isChecked}
      />
      <label htmlFor={tableName + "-radio-" + rowId}>Select</label>
    </>
  );
};

export default memo(RadioButton);
