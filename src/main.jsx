import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import AdminPage from "./components/AdminPage";


ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <Router basename="/sem3exam">
    <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          </Route>
        <Route path="/search" element={<Search />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<h1>Page Not Found !!!</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>

);
