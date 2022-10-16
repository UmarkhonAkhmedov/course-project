import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import InputField from "../../components/Form/InputField";
import { Box, Button, Typography } from "@mui/material";

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
    try {
      const url = "https://au-user-app.herokuapp.com/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
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
    <div className="signup">
      <div className="container">
        <form className="form_container" onSubmit={handleSubmit}>
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
          <InputField
            name="password"
            label="Password"
            handleChange={handleChange}
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
