import "./App.css";
import { Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import ManageCollections from "./pages/ManageCollections/ManageCollections";
import ManageItems from "./pages/ManageItems/ManageItems";
import axios from "axios";
import Admin from "./pages/Admin/Admin";

function App() {
  const [data, setData] = useState([]);
  const user = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-mode") === "true"
  );
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const fetchData = async () => {
    await axios.get("http://localhost:8000/users").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, [email]);

  const admin = data.filter(
    (item) => item.email === email && item.admin && item.status
  );

  useEffect(() => {
    localStorage.setItem("dark-mode", String(darkMode));
  }, [darkMode]);

  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} admin={admin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {user && (
            <>
              <Route path="/manage" element={<ManageCollections />} />
              <Route path="/manage/:id" element={<ManageItems />} />
              {admin.length > 0 && (
                <Route path="/admin" element={<Admin admin={admin} />} />
              )}
            </>
          )}
          <Route path="/admin" element={<Navigate replace to="/" />} />
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
