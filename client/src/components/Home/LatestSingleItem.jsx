import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import "./latestItems.css";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import axios from "axios";

function LatestSingleItem({
  name,
  tags,
  id,
  data,
  likes,
  fetching,
  setFetching,
}) {
  const [dataLikes, setDataLikes] = useState([]);
  const email = localStorage.getItem("email");
  const [save, setSave] = useState({ authorEmail: email, itemId: id });

  const fetchData = async () => {
    await axios.get("http://localhost:8000/like").then((res) => {
      setDataLikes(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = dataLikes.filter(
    (item) => item.itemId === id && item.authorEmail === email
  );

  console.log(dataLikes);

  const handleLikeButton = async () => {
    if (filteredData.length === 0) {
      const url = "http://localhost:8000/like/create";
      const { save: res } = await axios.post(url, save);
      console.log("second success");
      setFetching(!fetching);
    } else {
      const ids = filteredData[0].id;
      await axios
        .delete(`http://localhost:8000/like/remove/${ids}`)
        .then((res) => {
          console.log("Success");
        });
      setFetching(!fetching);
    }
  };

  return (
    <Paper elevation={5} className="latest__lists--item">
      <img src="" className="singleItem__img" />
      <h4>Name: {name}</h4>
      <h4>Tags: {tags}</h4>
      <Link
        to={`/details/${id}`}
        state={{ data: data }}
        style={{ textDecoration: "none" }}
      >
        <Button className="latest__button" variant="outlined">
          See Details
        </Button>
      </Link>
      <h5 className="latest__heart" onClick={handleLikeButton}>
        <ThumbUpAltIcon />
        {likes === -1 ? 0 : likes}
      </h5>
    </Paper>
  );
}

export default LatestSingleItem;
