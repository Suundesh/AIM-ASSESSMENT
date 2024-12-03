import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { parse } from "papaparse";
import { toast } from "react-toastify";
import Chart from "react-google-charts";
import './style.css';

function Dashboard() {
  const [jsonData, setJsonData] = useState([]);
  const [chartType, setChartType] = useState("Bar");
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  const handleFileUpload = (fileData) => {
    let temp = [];
    try {
      console.log("fileData", fileData[0]);
      if (fileData[0].name.split(".")[1] !== "csv")
        throw new Error("Please Upload csv file only");
      parse(fileData[0], {
        // header: true,
        worker: true,
        step: function (row) {
          try {
            console.log(row.data);
            if (
              row.data.length === 3
            )
              temp.push([
                row.data[0],
                row.data[1] === "Sales" ? row.data[1] : parseInt(row.data[1]),
                row.data[2] === "Profit" ? row.data[2] : parseInt(row.data[2]),
              ]);
            else {
              throw new Error("One row received with missing headers");
            }
          } catch (error) {
            console.log("error", error);
            toast.error(error.message);
          }
        },
        complete: function () {
          console.log("all done");
          setJsonData(temp);
        },

        error: function (error) {
          console.log(error);
          toast.error(error);
        },
      });
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales and Profit over the Years",
    },
  };

  return (
    <div>
      <div className="input-container">
        <TextField
          className="file-upload"
          type="file"
          placeholder="Upload your file"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
        <FormControl
          className="chart-drop-down"
        >
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            label={"Chart Type"}
            onChange={(e) => setChartType(e.target.value)}
          >
            <MenuItem value="Bar">Bar Chart</MenuItem>
            <MenuItem value="Line">Line Chart</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div >
        {jsonData.length > 0 ? (
          <Chart
            chartType={chartType}
            width={"100vw"}
            data={jsonData}
            options={options}
            height={"50vh"}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Dashboard;


