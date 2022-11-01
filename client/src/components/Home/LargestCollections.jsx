import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./largestCollections.css";

function LargestCollections() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    await axios
      .get("http://localhost:8000/collections/withItems")
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="largest">
      <h2>The List Of the Latest Collections</h2>
      <div className="largest__list">
        {data.slice(0, 5).map((item, index) => (
          <Paper className="largest__item" elevation={5} key={index}>
            <div>
              <img className="largest__item--img" src="" />
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p className="largest__item--number">
                Number of Items: {item.items.length}
              </p>
              <Link to={`/items/${item.id}`} state={{ data: item.items }}>
                <Button variant="outlined" sx={{ marginTop: "20px" }}>
                  See Items
                </Button>
              </Link>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default LargestCollections;
