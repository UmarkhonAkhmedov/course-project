import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./itemsTable.css";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "tags", headerName: "Tags", width: 200 },
  { field: "img", headerName: "Image", width: 200 },
  { field: "createdAt", headerName: "Created Time", width: 200 },
];

function ItemsTable() {
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
      <div className="table">
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
}

export default ItemsTable;
