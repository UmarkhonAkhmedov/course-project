import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import "./manageCollections.css";
import ModalCollections from "../../components/ModalCollections/ModalCollections";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

  const handleDeleteCollections = async (id) => {
    try {
      const url = `http://localhost:8000/collections/delete/${id}`;
      const res = await axios.delete(url);
      if (res.status === 200 || res.status === 201) {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <div className="manageCollects__list">
                  <div key={id} className="">
                    <div className="manageCollects__main--item">
                      <h4>Name: {item.name}</h4>
                      <h4>Topic: {item.topic}</h4>
                      <h4>Description: {item.description}</h4>
                      <h4>Number of Items: 0</h4>
                    </div>
                  </div>
                  <div>
                    <Button>
                      <EditIcon
                        sx={{
                          color: "green",
                          width: "28px",
                          height: "auto",
                        }}
                      />
                    </Button>
                    <Button>
                      <DeleteIcon
                        onClick={() => handleDeleteCollections(item.id)}
                        sx={{ color: "red", width: "28px", height: "auto" }}
                      />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ManageCollections;
