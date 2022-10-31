import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
function ButtonIncrement({ setItems, field }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>
        <Button
          onClick={() =>
            setItems((prevState) => ({
              ...prevState,
              integerField: [
                ...prevState.integerField,
                { number: 0, name: "" },
              ],
            }))
          }
          sx={{ width: "60px" }}
        >
          <AddCircleOutlineIcon sx={{ color: "#2196f3" }} />
          <Typography
            sx={{
              color: "#2196f3",
              marginLeft: "2px",
              fontSize: "11px",
              width: "100%",
            }}
          >
            Add
          </Typography>
        </Button>
      </Box>
      <Button
        onClick={() =>
          setItems((prevState) => ({
            ...prevState,
            integerField: [...prevState.integerField.slice(0, -1)],
          }))
        }
        sx={{ width: "80px", marginLeft: "10px" }}
      >
        <RemoveCircleOutlineIcon sx={{ color: "red" }} />
        <Typography sx={{ color: "red", marginLeft: "2px", fontSize: "11px" }}>
          Remove
        </Typography>
      </Button>
    </Box>
  );
}

export default ButtonIncrement;
