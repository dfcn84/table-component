import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Table } from "../../components/Table";
import { TableData } from "../../types";

const tableData: TableData = {
  tableName: "sub-data",
  collapseCol: true,
  selectType: "radio",
  mobileHeader: "Contract details",
  headers: {
    name: { title: "Name" },
    mobile: { title: "Mobile" },
    expiry: { title: "Expiry" },
    penalty: { title: "Penalty" },
  },
  data: [
    {
      name: "Mavis Chen",
      mobile: "8899 7654",
      expiry: "01-Dec-2022",
      penalty: 600,
    },
    {
      name: "Rodney Artichoke",
      mobile: "8899 8888",
      expiry: "01-Nov-2022",
      penalty: 200,
    },
    {
      name: "Valentino Morose",
      mobile: "8282 7654",
      expiry: "01-Jul-2022",
      penalty: 200,
    },
    {
      name: "Churry Son",
      mobile: "8111 7654",
      expiry: "01-Dec-2022",
      penalty: 200,
    },
    {
      name: "Penelope Grace",
      mobile: "8113 3324",
      expiry: "01-Jun-2023",
      penalty: 200,
    },
  ],
};

const meta = {
  title: "Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableWithMobileCollapse: Story = {
  args: {
    tableData: tableData,
  },
};
