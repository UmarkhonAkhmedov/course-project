import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "../Form/InputField";
import { FormHelperText, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import ButtonIncrement from "./ButtonIncrement";
import ManyFields from "./ManyFields";

const style = {
  position: "absolute",
  display: "block",
  flexDirection: "column",
  top: "10%",
  left: "20%",
  right: "20%",
  overflowY: "auto",
  width: "60%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

export default function ModalItems({ fetching, setFetching }) {
  const [numField, setNumField] = useState(0);
  const [textField, setTextField] = useState(0);
  const [multiField, setMultiField] = useState(0);
  const [numDateField, setNumDateField] = useState(0);
  const { id } = useParams();
  const [items, setItems] = useState({
    name: "",
    tags: "",
    collectionsId: id,
    integerField: {},
    stringField: {},
    multilineField: {},
    checkboxesField: {},
    dateField: {},
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = ({ currentTarget: input }) => {
    setItems({ ...items, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/items/create";
      const { items: res } = await axios.post(url, items);
      setOpen(false);
      setFetching(!fetching);
      setItems({
        name: "",
        tags: "",
        collectionsId: id,
        integerField: {},
        stringField: {},
        multilineField: {},
        checkboxesField: {},
        dataField: {},
      });
      console.log("Success");
    } catch (error) {
      console.log("Failded", error);
    }
  };

  console.log(items);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Create Item
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
              value={items.name}
              label="Enter A Name"
              handleChange={handleChange}
            />

            <InputField
              name="tags"
              value={items.tags}
              label="Enter Tags"
              handleChange={handleChange}
            />
            <ManyFields
              num={numField}
              name="Number"
              type="number"
              items={items}
              setItems={setItems}
            />
            <ButtonIncrement num={numField} setNum={setNumField} />

            <ManyFields
              num={textField}
              name="Text"
              type="text"
              items={items}
              setItems={setItems}
            />
            <ButtonIncrement num={textField} setNum={setTextField} />

            <ManyFields
              num={multiField}
              name="Multiline Text"
              type="multiline"
              items={items}
              setItems={setItems}
            />
            <ButtonIncrement num={multiField} setNum={setMultiField} />

            <ManyFields
              num={numDateField}
              name="Date"
              type="date"
              items={items}
              setItems={setItems}
            />
            <ButtonIncrement num={numDateField} setNum={setNumDateField} />

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
