import "./App.css";
import { Suspense, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
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
        </Routes>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
