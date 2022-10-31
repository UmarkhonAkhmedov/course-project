import { TextField } from "@mui/material";
import React, { useEffect } from "react";

function ManyFields({ name, type, items, setItems }) {
  useEffect(() => {
    console.log(items.integerField);
  }, [items.integerField]);
  return (
    <>
      {items.integerField.map((item, index) => (
        <div key={index}>
          <TextField
            sx={{ width: "100%", margin: "10px 0" }}
            id="outlined-basic"
            label={`Enter ${index + 1} ${name} Name`}
            variant="outlined"
            name="numberName"
            onChange={(e) =>
              setItems((prevState) => ({
                ...prevState,
                integerField: prevState.integerField.map((item, i) => {
                  if (i === index) {
                    return {
                      name: e.target.value,
                      number: prevState.integerField[index].number,
                    };
                  } else {
                    return item;
                  }
                }),
              }))
            }
            value={items.integerField[index].name}
          />
          {type === "number" && (
            <TextField
              sx={{ width: "100%", margin: "10px 0" }}
              id="outlined-number"
              label={`Enter ${index + 1} ${name} Field`}
              type="number"
              value={items.integerField[index].number}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setItems((prevState) => ({
                  ...prevState,
                  integerField: prevState.integerField.map((item, i) => {
                    if (i === index) {
                      return {
                        name: prevState.integerField[index].name,
                        number: e.target.value,
                      };
                    } else {
                      return item;
                    }
                  }),
                }))
              }
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
        </div>
      ))}
    </>
  );
}

export default ManyFields;
