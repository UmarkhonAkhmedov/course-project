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

function App() {
  const user = localStorage.getItem("token");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dark-mode") === "true"
  );
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    localStorage.setItem("dark-mode", String(darkMode));
  }, [darkMode]);

  return (
    <Suspense fallback={null}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/manage" element={<ManageCollections />} />
          <Route path="/manage/:id" element={<ManageItems />} />
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
