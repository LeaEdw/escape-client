import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Authorized } from "./views/authorized";
import { ApplicationViews } from "./views/applicationViews";
import "./App.css";

export const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem("escape_token"));

  const setToken = (newToken) => {
    localStorage.setItem('escape_token', newToken)
    setTokenState(newToken)
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="*"
          element={
            <Authorized>
              <ApplicationViews />
            </Authorized>
          }
        />
    </Routes>
  );
};
