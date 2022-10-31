import React from "react";
import { Button, Paper } from "@mui/material";
import "./latestItems.css";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

function LatestSingleItem({ name, tags, id, data, viewContent }) {
  return (
    <Paper elevation={5} className="latest__lists--item">
      <h4>Name: {name}</h4>
      <h4>Tags: {tags}</h4>
      <Link
        to={`details/${id}`}
        state={{ data: data }}
        style={{ textDecoration: "none" }}
      >
        <Button className="latest__button" variant="outlined">
          See Details
        </Button>
      </Link>
      <h5 className="latest__heart" onClick>
        <ThumbUpAltIcon />
        {viewContent}
      </h5>
    </Paper>
  );
}

export default LatestSingleItem;
