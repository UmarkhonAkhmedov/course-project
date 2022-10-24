import React from "react";
import LanguageToggler from "../Localization/LanguageToggler";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./navbar.css";
import DarkMode from "../DarkMode/DarkMode";

function Navbar({ darkMode, setDarkMode }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Paper className="navbar" elevation={5}>
      <Box className="container">
        <Box className="nav">
          <Box>
            <Link to="/">
              <Typography className="nav__logo" variant="h5" color="primary">
                MyCollects
              </Typography>
            </Link>
          </Box>
          <ul className="nav__list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/questions">Questions</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
          <Box className="nav__items">
            <Button
              sx={{ padding: "7px 25px", margin: "0 40px 0 10px" }}
              variant="contained"
              size="small"
              onClick={handleLogout}
            >
              <Link to="login">Login</Link>
            </Button>
            <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
            <Box className="nav__items--lan">
              <LanguageToggler />
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default Navbar;
