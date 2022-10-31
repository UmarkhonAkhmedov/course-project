import { Button, Paper } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./largestCollections.css";

function LargestCollections() {
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const fetchData = async () => {
    await axios.get("http://localhost:8000/collections").then((res) => {
      setData(res.data);
    });
  };

  const fetchItems = async () => {
    await axios.get("http://localhost:8000/items").then((res) => {
      setItems(res.items);
    });
  };

  useEffect(() => {
    fetchData();
    fetchItems();
  }, []);

  return (
    <div className="largest">
      <h2>The List Of the Largest Collections</h2>
      <div className="largest__list">
        {data.map((item, index) => (
          <Paper className="largest__item" elevation={5} key={index}>
            <div>
              <img className="largest__item--img" src="" />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p className="largest__item--number">Number of Items:</p>
              <Button variant="outlined" sx={{ marginTop: "20px" }}>
                See Items
              </Button>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default LargestCollections;
