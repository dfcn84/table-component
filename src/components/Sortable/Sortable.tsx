import React, {
  ReactElement,
  memo,
  useContext,
  useEffect,
  useRef
} from "react";
import { TableContext } from "../../context/TableContext";

type SortDirection = "" | "asc" | "desc";

type SortByAttribute = {
  attribute: string;
  order: SortDirection;
};

interface SortableProps {
  sortBy: string | undefined;
  isDate?: boolean | undefined;
  order?: string | false;
}

const Sortable = ({
  sortBy,
  isDate,
  order
}: SortableProps): ReactElement | null => {
  const {
    originalTableData,
    setStoredTableData,
    storedTableData,
    sortByAttribute,
    setSortByAttribute
  } = useContext(TableContext);

  const buttonRef = useRef<HTMLButtonElement>(null);
  let componentClassesArr = ["sortable"];

  if (order) {
    componentClassesArr.push(order);
  }

  const componentClasses = componentClassesArr.join(" ");

  const handleSort = () => {
    const clickedButton = buttonRef?.current;
    if (
      !clickedButton?.classList.contains("asc") &&
      !clickedButton?.classList.contains("desc")
    ) {
      setSortByAttribute({
        attribute: clickedButton?.dataset.sortBy as string,
        order: "asc"
      });
    } else if (clickedButton?.classList.contains("asc")) {
      setSortByAttribute({
        attribute: clickedButton?.dataset.sortBy as string,
        order: "desc"
      });
    } else if (clickedButton?.classList.contains("desc")) {
      setSortByAttribute({
        attribute: clickedButton?.dataset.sortBy as string,
        order: ""
      });
    }
  };

  useEffect(() => {
    const { attribute } = sortByAttribute;

    const doSorting = ({ attribute, order }: SortByAttribute) => {
      if (attribute) {
        if (order === "asc") {
          const sortedData = [...storedTableData].sort((a, b) => {
            if (isDate) {
              const dateA = new Date(a[attribute]);
              const dateB = new Date(b[attribute]);
              return dateA.getTime() - dateB.getTime();
            } else if (
              typeof a[attribute] === "string" &&
              typeof b[attribute] === "string"
            ) {
              return a[attribute].localeCompare(b[attribute]);
            } else {
              return a[attribute] - b[attribute];
            }
          });
          setStoredTableData([...sortedData]);
        } else if (order === "desc") {
          let isString = false;
          const sortedData = [...storedTableData].sort((a, b) => {
            if (isDate) {
              const dateA = new Date(a[attribute]);
              const dateB = new Date(b[attribute]);
              return dateB.getTime() - dateA.getTime();
            } else if (
              typeof a[attribute] === "string" &&
              typeof b[attribute] === "string"
            ) {
              isString = true;
              return a[attribute].localeCompare(b[attribute]);
            } else {
              return b[attribute] - a[attribute];
            }
          });
          if (isString) {
            setStoredTableData([...sortedData.reverse()]);
          } else {
            setStoredTableData([...sortedData]);
          }
        } else {
          setStoredTableData([...originalTableData]);
        }
      }
    };

    if (sortBy === attribute) {
      doSorting(sortByAttribute);
    }
  }, [isDate, sortBy, sortByAttribute]);
  return (
    <button
      ref={buttonRef}
      className={componentClasses}
      data-sort-by={sortBy}
      onClick={handleSort}
      aria-label="Sort"
    >
      &nbsp;
    </button>
  );
};

export default memo(Sortable);
