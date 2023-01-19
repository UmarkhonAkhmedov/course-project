import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./userManagement.css";

function UserCollections() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    await axios
      .get("https://course-project-rgk2.vercel.app/users")
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="userManagement">
      <div>
        <h3>Enter Other Users Collections for Editing, Deleting</h3>
        <div className="userManagement__list">
          {data.map((item, index) => (
            <Link
              to={{ pathname: `/manage/${item.id}`, state: item.id }}
              key={index}
            >
              <Button sx={{ border: "1px solid", padding: "20px 40px" }}>
                {index + 1}. {item.email}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserCollections;
