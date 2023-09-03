import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Table } from "../components/Table";

describe("Table component", () => {
  let tableData = {
    tableName: "test-data",
    headers: {
      name: { title: "Name", sortable: true },
      email: { title: "E-mail" },
      phone: { title: "Phone" }
    },
    data: [
      {
        name: "Peter Pan",
        email: "peter.pan@gmail.com",
        phone: "81231234"
      },
      {
        name: "John Tessa",
        email: "j.tessa@gmail.com",
        phone: "98981111"
      }
    ]
  };

  afterEach(() => {
    cleanup();
  });

  it("renders table headers", () => {
    render(<Table tableData={tableData} />);
    const thead = screen.getByRole("table").querySelector("thead");
    expect(thead).toHaveTextContent("Name");
    expect(thead).toHaveTextContent("E-mail");
    expect(thead).toHaveTextContent("Phone");
  });

  it("renders table rows sortable button", () => {
    render(<Table tableData={tableData} />);

    const sortByOperatorButton = screen.getByRole("button", {
      attributes: {
        class: "sortable",
        "data-sort-by": "operator"
      }
    });
    expect(sortByOperatorButton).toBeInTheDocument();
  });

  it("sorts the data", () => {
    render(<Table tableData={tableData} />);

    const sortByOperatorButton = screen.getByRole("button", {
      attributes: {
        class: "sortable",
        "data-sort-by": "operator"
      }
    });
    fireEvent.click(sortByOperatorButton);
    const firstRow = screen
      .getByRole("table")
      .querySelectorAll("tbody tr td")[0].innerHTML;
    expect(firstRow).not.toBe(tableData.data[0].operator);
  });

  it("renders table rows with radio button", () => {
    tableData.selectType = "radio";
    render(<Table tableData={tableData} />);

    const radioButtons = screen
      .getByRole("table")
      .querySelectorAll("tbody tr td input[type='radio']");
    expect(radioButtons.length).toBe(tableData.data.length);
  });

  it("selects radio button", () => {
    tableData["selectType"] = "radio";
    render(<Table tableData={tableData} />);

    const radioButton = screen
      .getByRole("table")
      .querySelectorAll("tbody tr td input[type='radio']")[0];
    fireEvent.click(radioButton);
    expect(radioButton.checked).toBe(true);
    expect(radioButton.parentElement.parentElement).toHaveClass("selected");
    delete tableData.selectType;
  });

  it("renders table rows with checkboxes", () => {
    tableData.selectType = "checkbox";
    render(<Table tableData={tableData} />);

    const checkboxesHead = screen
      .getByRole("table")
      .querySelectorAll("thead tr td input[type='checkbox']");
    expect(checkboxesHead.length).toBe(1);

    const checkboxesBody = screen
      .getByRole("table")
      .querySelectorAll("tbody tr td input[type='checkbox']");
    expect(checkboxesBody.length).toBe(tableData.data.length);
    delete tableData.selectType;
  });

  it("selects checkbox", () => {
    tableData.selectType = "checkbox";
    render(<Table tableData={tableData} />);

    const checkbox = screen
      .getByRole("table")
      .querySelectorAll("tbody tr td input[type='checkbox']")[0];
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(checkbox.parentElement.parentElement).toHaveClass("selected");
    delete tableData.selectType;
  });

  it("selects 'select all' checkbox", () => {
    tableData.selectType = "checkbox";
    render(<Table tableData={tableData} />);

    const checkbox = screen
      .getByRole("table")
      .querySelector("thead tr td input[type='checkbox']");
    fireEvent.click(checkbox);
    const bodyCheckboxes = screen
      .getByRole("table")
      .querySelectorAll("tbody tr td input[type='checkbox']");
    let checkedCount = 0;
    bodyCheckboxes.forEach((bodyCheckbox) => {
      if (bodyCheckbox.checked) checkedCount++;
    });
    expect(checkedCount).toBe(tableData.data.length);
    delete tableData.selectType;
  });

  it("renders table rows with data", () => {
    render(<Table tableData={tableData} />);
    const bodyRows = screen.getByRole("table").querySelectorAll("tbody tr ");

    expect(bodyRows[0].querySelectorAll("td")[0].innerHTML).toBe("Peter Pan");
    expect(bodyRows[0].querySelectorAll("td")[1].innerHTML).toBe(
      "peter.pan@gmail.com"
    );
    expect(bodyRows[0].querySelectorAll("td")[2].innerHTML).toBe("81231234");

    expect(bodyRows[1].querySelectorAll("td")[0].innerHTML).toBe("John Tessa");
    expect(bodyRows[1].querySelectorAll("td")[1].innerHTML).toBe(
      "j.tessa@gmail.com"
    );
    expect(bodyRows[1].querySelectorAll("td")[2].innerHTML).toBe("98981111");
  });
});
