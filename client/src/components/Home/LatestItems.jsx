import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Paper } from "@mui/material";
import "./latestItems.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

function LatestItems() {
  const [data, setData] = useState([]);
  const [collections, setCollections] = useState([]);
  const [users, setUsers] = useState([]);
  const [like, setLike] = useState(false);

  const fetchData = async () => {
    await axios.get("http://localhost:8000/items").then((res) => {
      setData(res.data);
    });
  };
  const fetchCollections = async () => {
    await axios.get("http://localhost:8000/collections").then((res) => {
      setCollections(res.collections);
    });
  };
  const fetchUsers = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      setUsers(res.users);
    });
  };
  useEffect(() => {
    fetchData();
    fetchCollections();
    fetchUsers();
  }, []);

  const handleLikeClick = (id) => {
    if (id) {
      setLike(!like);
    }
  };

  return (
    <div className="latest">
      <h2>The List Of the Latest Items</h2>
      <div className="latest__lists">
        {[...data].reverse().map((item, index) => (
          <Paper elevation={5} className="latest__lists--item" key={index}>
            <h4>Name: {item.name}</h4>
            <h4>Tags: {item.tags}</h4>

            <h4>Tags: {item.tags}</h4>
            <Link
              to={`details/${item.id}`}
              state={{ data: data }}
              style={{ textDecoration: "none" }}
            >
              <Button className="latest__button" variant="outlined">
                See Details
              </Button>
            </Link>
            <h5
              className="latest__heart"
              onClick={() => handleLikeClick(item.id)}
            >
              {like ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "red" }} />
              )}
              {item.viewContent}
            </h5>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default LatestItems;
