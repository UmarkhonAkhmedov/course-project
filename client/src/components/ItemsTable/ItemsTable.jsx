import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "./itemsTable.css";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "tags", headerName: "Tags", width: 200 },
  { field: "img", headerName: "Image", width: 200 },
  { field: "createdAt", headerName: "Created Time", width: 200 },
];

function ItemsTable({ fetching }) {
  const { id } = useParams();
  const [select, setSelect] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios.get("http://localhost:8000/items").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetching]);

  const filteredData = data.filter((item) => item.collectionsId === id);

  const handleChange = (event, itemId) => {
    if (event.target.checked) {
      setSelect((current) => [...current, itemId]);
    } else {
      const arrayFilter = select.filter((item) => item !== itemId);
      setSelect(arrayFilter);
    }
  };
  const handleSelectAllClick = () => {
    if (filteredData.length === select.length) {
      setSelect([]);
    } else {
      filteredData.map((item) => {
        setSelect((current) => Array.from(new Set([...current, item.id])));
      });
    }
  };

  const handleDeleteProperty = async () => {
    for (let i = 0; i < select.length; i++) {
      try {
        const url = `http://localhost:8000/items/delete/${select[i]}`;
        const res = await axios.delete(url);
        if (res.status === 200 || res.status === 201) {
          setSelect([]);
          fetchData();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(select);

  return (
    <Box sx={{ margin: "50px 0" }}>
      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>
                <Button variant="contained" onClick={handleSelectAllClick}>
                  Select All
                </Button>
              </th>
              <th>Id</th>
              <th>Name</th>
              <th>Tags</th>
              <th>Like Count</th>
            </tr>
          </thead>
          {filteredData.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td className="checkbox">
                  <input
                    type="checkbox"
                    name="ids"
                    checked={select.filter((id) => id === item.id).length > 0}
                    onChange={(event) => handleChange(event, item.id)}
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.tags}</td>
                <td>{item.viewContent}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="listButtons">
          <Button
            variant="contained"
            className="delete__btn"
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "red" },
            }}
            onClick={handleDeleteProperty}
          >
            Delete
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default ItemsTable;
