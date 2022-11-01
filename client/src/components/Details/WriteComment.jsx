import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./writeComments.css";

function WriteComment() {
  const { id } = useParams();
  const email = localStorage.getItem("email");
  const [data, setData] = useState({
    text: "",
    itemId: id,
    authorEmail: email,
  });
  console.log(data);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://ua-collects-app.herokuapp.com/comments/create";
      const { data: res } = await axios.post(url, data);
      setData({
        text: "",
        itemId: id,
        authorEmail: email,
      });
      console.log("success");
    } catch (error) {
      console.log("failed");
      console.log(error.response);
    }
  };

  return (
    <div>
      <h2 className="writeComments__heading">Write a Comment</h2>
      <form className="writeComments" onSubmit={handleSubmit}>
        <TextField
          id="outlined-multiline-static"
          label="You can enter any comment"
          multiline
          name="text"
          value={data.text}
          rows={4}
          sx={{ marginBottom: "20px" }}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" disabled={!email && true}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default WriteComment;
