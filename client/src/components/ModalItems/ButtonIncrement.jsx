import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
function ButtonIncrement({ num, setNum }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box>
        <Button onClick={() => setNum(num + 1)} sx={{ width: "60px" }}>
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
        onClick={() => {
          setNum(num - 1);
        }}
        disabled={num === 0}
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
