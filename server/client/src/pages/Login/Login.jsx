import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import "./login.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import InputField from "../../components/Form/InputField";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://ua-collects-app.herokuapp.com/users/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("email", data.email);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login__container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" color="primary" fontWeight={600} mb={5}>
            Login in Your Account
          </Typography>
          <InputField
            name="email"
            label="Email"
            handleChange={handleChange}
            value={data.email}
          />
          <TextField
            sx={{ width: "100%", margin: "10px 0" }}
            required
            id="outlined-password-input"
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            value={data.password}
          />
          {error && <div className="error_msg">{error}</div>}
          <Button
            variant="contained"
            size="medium"
            type="submit"
            className="btn__submit"
          >
            Sing In
          </Button>
        </form>
        <Box className="register__link">
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            Don't have account?
          </Typography>
          <Link to="/signup">
            <Button size="medium" sx={{ fontWeight: 700, fontSize: "15px" }}>
              Sign Up
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default Login;
