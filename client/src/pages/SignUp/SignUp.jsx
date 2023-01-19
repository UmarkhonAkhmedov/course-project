import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import InputField from "../../components/Form/InputField";
import { Box, Button, TextField, Typography } from "@mui/material";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const url = "https://course-project-rgk2.vercel.app/users/signup";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(data);
    } catch (error) {
      console.log(error.response);
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
            Create Your Account
          </Typography>
          <InputField
            name="name"
            label="Name"
            handleChange={handleChange}
            value={data.name}
          />
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
            Sing Up
          </Button>
        </form>
        <Box className="register__link">
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            Already, have account?
          </Typography>
          <Link to="/login">
            <Button size="medium" sx={{ fontWeight: 700, fontSize: "15px" }}>
              Sing in
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default Signup;
