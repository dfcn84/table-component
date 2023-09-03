import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { Table } from "../../components/Table";
import { TableData } from "../../types";

const tableData: TableData = {
  tableName: "sub-data",
  headers: {
    operator: { title: "Operator" },
    headsetDisplay: { title: "Headset Display" },
    threeGAvailability: { title: "3G Availability" },
  },
  data: [
    {
      operator: "*Celcom Axiata (LTE)",
      headsetDisplay: "CELCOM / My Celcom / 502 19",
      threeGAvailability: "Yes",
    },
    {
      operator: "*DiGi Telecom (LTE)",
      headsetDisplay: "DiGi 1800 / DiGi / MYMY18",
      threeGAvailability: "Yes",
    },
    {
      operator: "*Maxis (LTE)",
      headsetDisplay: "U Mobile / MYS 18 / MY 18",
      threeGAvailability: "Yes",
    },
    {
      operator: "U Mobile (LTE)",
      headsetDisplay: "U Mobile / MYS 18 / MY 18",
      threeGAvailability: "Yes",
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
    jsonschema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "https://my-components/button.schema.json",
      type: "object",
      properties: {
        primary: {
          type: "boolean",
          default: false,
        },
        label: {
          type: "string",
        },
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTable: Story = {
  args: {
    tableData: tableData,
  },
};
