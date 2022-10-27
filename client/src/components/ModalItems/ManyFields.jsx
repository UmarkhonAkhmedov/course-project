import { TextField } from "@mui/material";
import React from "react";

function ManyFields({ name, num, type }) {
  return (
    <>
      {[...Array(num)].map((item, index) => (
        <div key={index}>
          <TextField
            sx={{ width: "100%", margin: "10px 0" }}
            id="outlined-basic"
            label={`Enter ${index + 1} ${name} Name`}
            variant="outlined"
          />
          {type === "number" && (
            <TextField
              sx={{ width: "100%", margin: "10px 0" }}
              id="outlined-number"
              label={`Enter ${index + 1} ${name} Field`}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          {type === "text" && (
            <TextField
              sx={{ width: "100%", margin: "10px 0" }}
              id="outlined-basic"
              label={`Enter ${index + 1} ${name} Text`}
              variant="outlined"
            />
          )}
          {type === "multiline" && (
            <TextField
              sx={{ width: "100%", margin: "10px 0" }}
              id="outlined-multiline-flexible"
              label={`Enter ${index + 1} ${name}`}
              multiline
              maxRows={4}
            />
          )}
          {type === "date" && (
            <TextField
              sx={{ width: "100%", margin: "10px 0" }}
              id="outlined-basic"
              label={`Enter ${index + 1} ${name}`}
              variant="outlined"
            />
          )}
          {type === "checkbox" && (
            
          )}
        </div>
      ))}
    </>
  );
}

export default ManyFields;
