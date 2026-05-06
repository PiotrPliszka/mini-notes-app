import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import icon from "../assets/house.svg";
import api from "../api/axios";
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const { login } = useAuth();
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("auth/login/", user);
      const { access, refresh } = response.data;
      login(access, refresh);
      navigate("/dashboard");
      console.log("Succes: ", response.data);
    } catch (error) {
      if (error.response) {
        console.log("Error data: ", error.response.data);
      } else {
        console.log("Error message: ", error.message);
      }
    }
  }

  return (
    <div className="main-container">
      <div className="title-div">
        <div className="top-bar">
          <p className="mini-title">Auth</p>
          <Link to="/">
            <img src={icon} alt="Home" className="home-icon" />
          </Link>
        </div>
        <h1 className="about-app">Regitser or log in without friction</h1>
      </div>
      <div className="buttons-div">
        <NavLink
          to="/register"
          className={({ isActive }) =>
            `register-btn ${isActive ? "auth-btn-active" : "auth-btn-inactive"}`
          }
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `login-btn ${isActive ? "auth-btn-active" : "auth-btn-inactive"}`
          }
        >
          Login
        </NavLink>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit">Start Writing</button>
        </form>
      </div>
      <div className="note-div">
        <p className="note-title">Goode next step</p>
        <span className="short-note">
          After submit, enojy creating notes B)
        </span>
      </div>
    </div>
  );
}
