import React from "react";
import LanguageToggler from "../Localization/LanguageToggler";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./navbar.css";
import DarkMode from "../DarkMode/DarkMode";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <Box className="navbar">
      <Box className="container">
        <Box className="nav">
          <Box className="nav__logo">
            <Link to="/">Collects</Link>
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
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <Box className="nav__items">
            <Button variant="outlined" size="small">
              <Link to="login">Login</Link>
            </Button>
            <Button sx={{ margin: "0 10px" }} variant="contained" size="small">
              <Link to="signup">Sign Up</Link>
            </Button>
            <Box className="nav__items--lan">
              <LanguageToggler />
            </Box>
            <DarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
