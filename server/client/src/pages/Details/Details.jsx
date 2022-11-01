import { Paper } from "@mui/material";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ListComments from "../../components/Details/ListComments";
import WriteComment from "../../components/Details/WriteComment";
import "./details.css";

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const data = location.state?.data;

  return (
    <div className="details">
      <div className="container">
        {data
          .filter((item) => item.id === id)
          .map((item, index) => (
            <Paper key={index} elevation={10} className="details__list">
              <img className="details__list--img" src={item.img} />
              <div>
                <h3>Name: {item.name}</h3>
                <h3>Tags: {item.tags}</h3>
              </div>
            </Paper>
          ))}
        <div className="details__comments">
          <div className="details__comments--writeComments">
            <WriteComment />
          </div>
          <ListComments />
        </div>
      </div>
    </div>
  );
}

export default Details;
