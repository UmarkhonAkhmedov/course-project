import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./manageItems.css";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "tags", headerName: "Tags", width: 200 },
  { field: "img", headerName: "Image", width: 200 },
  { field: "createdAt", headerName: "Created Time", width: 200 },
];

function ManageItems() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios.get("http://localhost:8000/items").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) => item.collectionsId === id);

  console.log(data);

  return (
    <Box sx={{ margin: "50px 0" }}>
      <div className="container">
        {/* {data
          .filter((object) => object.collectionsId === id)
          .map((item, id) => (
            <div key={id}>{item.name}</div>
          ))} */}
        <div className="table">
          <DataGrid
            rows={filteredData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </Box>
  );
}

export default ManageItems;
