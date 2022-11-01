import React, { useState, useEffect } from "react";
import { Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  img,
}) {
  const [dataLikes, setDataLikes] = useState([]);
  const { i18n, t } = useTranslation(["Home"]);
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

  const handleLikeButton = async () => {
    if (filteredData.length === 0) {
      const url = "http://localhost:8000/like/create";
      const { save: res } = await axios.post(url, save);
      setFetching(!fetching);
    } else {
      const ids = filteredData[0].id;
      await axios
        .delete(`http://localhost:8000/like/remove/${ids}`)
        .then((res) => {});
      setFetching(!fetching);
    }
  };

  return (
    <Paper elevation={5} className="latest__lists--item">
      <img src={img} className="singleItem__img" />
      <h4>
        {t("name")}: {name}
      </h4>
      <h4>
        {t("tag")}: {tags}
      </h4>
      <Link
        to={`/details/${id}`}
        state={{ data: data }}
        style={{ textDecoration: "none" }}
      >
        <Button className="latest__button" variant="outlined">
          {t("seeDetails")}
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
