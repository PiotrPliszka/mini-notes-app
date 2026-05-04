import React from "react";
import { NavLink } from "react-router-dom";
import "./RegisterPage.css";

export function RegisterPage() {
  return (
    <div className="main-container">
      <div className="title-div">
        <p className="mini-title">Auth</p>
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
        <form>
          <label>Username</label>
          <input type="text" />
          <label>Email</label>
          <input type="text" />
          <label>Password</label>
          <input type="text" />
          <label>Confrim Password</label>
          <input type="text" />
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
