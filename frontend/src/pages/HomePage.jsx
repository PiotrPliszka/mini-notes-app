import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

export function HomePage() {
  return (
    <div className="main-container">
      <div className="title-div">
        <p className="mini-title">MINI NOTES APP</p>
        <h1 className="about-app">Private notes with calm auth-first UX.</h1>
        <p className="about-app-desc">
          a lightweigh workspace for one user, one dashborad, and notes that
          stay clearly separated and easy to merge
        </p>
      </div>
      <div className="content">
        <div className="buttons-to-form">
          <Link to="/register" className="register-btn">
            Create account
          </Link>
          <Link to="/login" className="login-btn">
            Sign in
          </Link>
        </div>
        <div className="sub-content">
          <div className="sub-content-grid">
            <p className="technologies">JWT login and refresh flow</p>
            <p className="technologies">Protected dashboard routes</p>
            <p className="technologies">Personal Crud for notes only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
