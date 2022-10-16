import { TextField } from "@mui/material";
import React from "react";

function InputField({ value, handleChange, label, name }) {
  return (
    <TextField
      sx={{ width: "100%", margin: "10px 0" }}
      required
      id="outlined-required"
      label={label}
      name={name}
      onChange={handleChange}
      value={value}
    />
  );
}

export default InputField;
