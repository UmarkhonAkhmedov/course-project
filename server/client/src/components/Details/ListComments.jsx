import { Paper } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./listComments.css";

function ListComments() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    await axios
      .get("https://ua-collects-app.herokuapp.com/comments")
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const filteredData = data.filter((item) => item.itemId === id).reverse();
  console.log(filteredData);

  return (
    <div>
      <h2 className="listComments__heading">List of Comments</h2>
      <div>
        {filteredData.map((item, index) => (
          <Paper elevation={5} className="listComments__list">
            <h4>Email: {item.authorEmail}</h4>
            <p className="listComments__text">
              {" "}
              <span style={{ fontWeight: "bold" }}>Comment:</span> {item.text}
            </p>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default ListComments;
