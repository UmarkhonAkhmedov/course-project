import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import InputField from "../../components/Form/InputField";

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
    <div className="container">
      <div className="signup_form_container">
        <div className="left">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Create Your Account</h1>
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
            <button type="submit" className="green_btn">
              Sing Up
            </button>
          </form>
          <div className="right">
            <h5>Already, have account?</h5>
            <Link to="/login">
              <button type="button" className="white_btn">
                Sing in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
