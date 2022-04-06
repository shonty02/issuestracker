import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";

import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import Signup from "./components/signup";
import addTeam from "./components/addTeam";

import { UserProvider } from "./userContext";
import AddTeam from "./components/addTeam";
import TeamDashboard from "./components/teamDashboard";
import Home from "./components/home";
import ManageIssues from "./components/manageIssues";

function App() {
  const [darktheme, setDarktheme] = useState(false);

  const themeB = createTheme({
    palette: {
      mode: "dark",
      background: {
        paper: "#555555",
      },
    },
  });

  const themeA = createTheme({
    palette: {
      mode: "light",
      success: {
        main: "#00ffb3",
        dark: "#ccad00",
      },
    },
  });

  return (
    <div>
      <UserProvider>
        <ThemeProvider theme={darktheme ? themeB : themeA}>
          <BrowserRouter>
            <Header darktheme={darktheme} setDarktheme={setDarktheme}></Header>
            {/* <Link to="/login">Login Now</Link>
        <Link to="/home">Go to Home</Link> */}

            <Routes>
              <Route element={<Login />} path="/login" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<AddTeam />} path="/addteam" />
              <Route element={<TeamDashboard />} path="/teamdash" />
              <Route element={<Home />} path="/home" />
              <Route element={<ManageIssues />} path="/manageissues" />


              <Route element={<Navigate to="/login" />} path="" />

            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;