import { TableData } from "./types";
import { Table } from "./components/Table";
import "./assets/styles/styles.scss";

const tableData: TableData = {
  tableName: "sub-data",
  selectType: "checkbox",
  headers: {
    brn: { title: "BRN" },
    companyName: { title: "Company Name" }
  },
  data: [
    {
      brn: "198702333K",
      companyName: "Blue Ocean International"
    },
    {
      brn: "198702333K",
      companyName: "Red Electronics"
    },
    {
      brn: "196700335H",
      companyName: "Yellow Gaming"
    },
    {
      brn: "196800306E",
      companyName: "Purple Automobiles"
    },
    {
      brn: "199131124V",
      companyName: "Diamond Interiors Holdings"
    },
    {
      brn: "200201624D",
      companyName: "Omnichannel Solutions International"
    }
  ]
};
const App = () => <Table tableData={tableData} />;

export default App;
