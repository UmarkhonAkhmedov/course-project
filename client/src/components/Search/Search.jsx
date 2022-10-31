import React, { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import "./search.css";
import axios from "axios";

export default function Search() {
  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  let inputHandler = (e) => {
    setOpen(true);
    setInputText(e.target.value);
    if (inputText.length === 0) {
      setOpen(false);
    }
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:8000/items/search?term=${inputText}`)
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [inputText]);

  const ref = useRef(null);

  const onClickOutside = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      className="search__item"
      ref={ref}
    >
      <InputBase
        sx={{ ml: 3, flex: 1 }}
        placeholder="Search Items"
        inputProps={{ "aria-label": "search items" }}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        onChange={inputHandler}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => setOpen(!open)}
      >
        <SearchIcon />
      </IconButton>
      {open && (
        <Paper className="search__result">
          {data.length === 0 ? (
            <h4>No any result</h4>
          ) : (
            data.map((item, index) => (
              <div key={index}>
                <Link
                  to={`details/${item.id}`}
                  state={{ data: data }}
                  className="search__result--link"
                  onClick={() => setOpen(false)}
                >
                  <h4>{item.name}</h4>
                </Link>
                <Divider orientation="horizontal" />
              </div>
            ))
          )}
        </Paper>
      )}
    </Paper>
  );
}
