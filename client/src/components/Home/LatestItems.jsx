import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Paper } from "@mui/material";
import "./latestItems.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import LatestSingleItem from "./LatestSingleItem";

function LatestItems() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios.get("http://localhost:8000/items").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="latest">
      <h2>The List Of the Latest Items</h2>
      <div className="latest__lists">
        {[...data].reverse().map((item) => (
          <LatestSingleItem
            key={item.id}
            name={item.name}
            tags={item.tags}
            data={data}
            viewContent={item.viewContent}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestItems;
