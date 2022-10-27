import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./itemsTable.css";
import InputField from "../Form/InputField";

function ItemsTable({ fetching }) {
  const { id } = useParams();
  const [select, setSelect] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const filteredData = data.filter((item) => item.collectionsId === id);
  const editElement = select[0];
  // const editElementFiltered = filteredData.filter((item) => {
  //   if (item.id === editElement) return item;
  // });

  const [items, setItems] = useState({
    name: "",
    tags: "",
    collectionsId: id,
    integerField: {},
    stringField: {},
    multilineField: {},
    checkboxesField: {},
    dateField: {},
  });

  const fetchData = async () => {
    await axios.get("http://localhost:8000/items").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetching]);

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

  const handleEditProperty = async () => {
    try {
      const url = `http://localhost:8000/items/update/${editElement}`;
      const res = await axios.patch(url, items);

      if (res.status === 200 || res.status === 201) {
        setSelect([]);
        fetchData();
        setOpen(false);
        setItems({
          name: "",
          tags: "",
          collectionsId: id,
          integerField: {},
          stringField: {},
          multilineField: {},
          checkboxesField: {},
          dateField: {},
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandleChange = ({ currentTarget: input }) => {
    setItems({ ...items, [input.name]: input.value });
  };

  const editClickButton = () => {
    if (select.length !== 0) {
      setOpen(!open);
    }
  };

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
              backgroundColor: "green",
              "&:hover": { backgroundColor: "green" },
            }}
            onClick={editClickButton}
          >
            Edit
          </Button>
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
        <div>
          {open && (
            <div style={{ marginTop: "20px" }}>
              <h2>Edit Item</h2>
              <Box sx={{ width: "50%" }}>
                <h3 style={{ margin: "30px 0 10px 0" }}>
                  Edit This ID: {editElement}
                </h3>
                <InputField
                  name="name"
                  value={items.name}
                  label="Edit Name"
                  handleChange={inputHandleChange}
                />
                <InputField
                  name="tags"
                  value={items.tags}
                  label="Edit Tags"
                  handleChange={inputHandleChange}
                />
              </Box>
              <Button
                variant="contained"
                sx={{ marginTop: "20px" }}
                onClick={handleEditProperty}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
}

export default ItemsTable;
