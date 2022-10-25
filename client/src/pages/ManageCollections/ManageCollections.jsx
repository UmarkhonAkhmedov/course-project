import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import "./manageCollections.css";
import ModalCollections from "../../components/ModalCollections/ModalCollections";

function ManageCollections() {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchData = async () => {
    await axios.get("http://localhost:8000/collections").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetching]);

  return (
    <Box>
      <div className="container">
        <div className="manageCollects">
          <div className="manageCollects__header">
            <h2>All Collections</h2>
            <ModalCollections fetching={fetching} setFetching={setFetching} />
          </div>
          <div className="manageCollects__main">
            {data.length === 0 ? (
              <h3>There is no Collections</h3>
            ) : (
              data.map((item, id) => (
                <Button key={id} className="">
                  <div className="manageCollects__main--item">
                    <h4>Name: {item.name}</h4>
                    <h4>Topic: {item.topic}</h4>
                    <h4>Description: {item.description}</h4>
                  </div>
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ManageCollections;
