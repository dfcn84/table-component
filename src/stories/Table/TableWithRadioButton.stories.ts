import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Table } from "../../components/Table";
import { TableData } from "../../types";

const tableData: TableData = {
  tableName: "sub-data",
  selectType: "radio",
  headers: {
    brn: { title: "BRN" },
    companyName: { title: "Company Name" },
  },
  data: [
    {
      brn: "198702333K",
      companyName: "Blue Ocean International",
    },
    {
      brn: "198702333K",
      companyName: "Red Electronics",
    },
    {
      brn: "196700335H",
      companyName: "Yellow Gaming",
    },
    {
      brn: "196800306E",
      companyName: "Purple Automobiles",
    },
    {
      brn: "199131124V",
      companyName: "Diamond Interiors Holdings",
    },
    {
      brn: "200201624D",
      companyName: "Omnichannel Solutions International",
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
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableWithRadioButton: Story = {
  args: {
    tableData: tableData,
  },
};
