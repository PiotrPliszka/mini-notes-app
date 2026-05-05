import React from "react";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import icon from "../assets/house.svg";
import "./RegisterPage.css";

export function RegisterPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("auth/register/", user);
      console.log("Sukces", response.data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Error data: ", error.response.data);
      } else {
        console.error("Error message: ", error.message);
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <label>Confrim Password</label>
          <input
            type="password"
            name="confirm_password"
            value={user.confirm_password}
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
