import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "../Form/InputField";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

export default function ModalCollections({ fetching, setFetching, userData }) {
  const { id } = useParams();
  const filteredData = userData.filter((item) => item.id === id);
  const getEmailId = filteredData[0].email;
  const [collection, setCollection] = useState({
    name: "",
    topic: "",
    description: "",
    authorEmail: getEmailId,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setCollection({ ...collection, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/collections/create";
      const { collection: res } = await axios.post(url, collection);
      setOpen(false);
      setFetching(!fetching);
      setCollection({
        name: "",
        topic: "",
        description: "",
        authorEmail: getEmailId,
      });
      setError("");
    } catch (error) {
      console.log("Failded", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Create Collection
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Collection
            </Typography>
            <InputField
              name="name"
              value={collection.name}
              label="Enter A Name"
              handleChange={handleChange}
            />
            <FormHelperText sx={{ color: "red", marginTop: "-10px" }}>
              {error && <div>{error}</div>}
            </FormHelperText>
            <InputField
              name="description"
              value={collection.description}
              label="Enter A Description"
              handleChange={handleChange}
            />
            <FormControl fullWidth sx={{ marginTop: "10px" }}>
              <InputLabel id="demo-simple-select-label">
                Enter A Topic
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={collection.topic}
                label="Enter A Topic"
                onChange={(e) =>
                  setCollection({ ...collection, topic: e.target.value })
                }
              >
                <MenuItem value="books">Books</MenuItem>
                <MenuItem value="post-stamps">Post-Stamps</MenuItem>
                <MenuItem value="coins">Coins</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: "40px" }}
            >
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
