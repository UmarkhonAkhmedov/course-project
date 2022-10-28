import React, { useState } from "react";
import LanguageToggler from "../Localization/LanguageToggler";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./navbar.css";
import DarkMode from "../DarkMode/DarkMode";
import { deepOrange } from "@mui/material/colors";

function Navbar({ darkMode, setDarkMode, admin }) {
  const user = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [dropDown, setDropDown] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setDropDown(!dropDown);
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
            {!user && (
              <Button
                sx={{ padding: "7px 25px", margin: "0 40px 0 10px" }}
                variant="contained"
                size="small"
                onClick={handleLogout}
              >
                <Link to="login">Login</Link>
              </Button>
            )}
            {admin.length > 0 && (
              <Link to="/admin">
                <Button variant="contained" sx={{ marginRight: "20px" }}>
                  Admin
                </Button>
              </Link>
            )}

            {user && (
              <div className="user">
                <Avatar
                  onClick={() => setDropDown(!dropDown)}
                  sx={{ bgcolor: deepOrange[500], textTransform: "uppercase" }}
                >
                  {email[0]}
                </Avatar>
                {dropDown && (
                  <Paper elevation={3} className="userDetails">
                    <Link to="/manage" onClick={() => setDropDown(!dropDown)}>
                      <h5 className="avatar__item">Manage Items</h5>
                    </Link>
                    <a href="/login" onClick={handleLogout}>
                      <h5 className="avatar__item">Log Out</h5>
                    </a>
                  </Paper>
                )}
              </div>
            )}
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
