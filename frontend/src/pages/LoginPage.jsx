import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import icon from "../assets/house.svg";
import api from "../api/axios";
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({
    usernameError: "",
    passwordError: "",
    detailError: "",
  });
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError({
      usernameError: "",
      passwordError: "",
      detailError: "",
    });
    try {
      const response = await api.post("auth/login/", user);
      const { access, refresh } = response.data;
      login(access, refresh);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        const backendErrors = error.response.data;
        console.log("Error data: ", error.response.data);
        setError({
          usernameError: backendErrors.username?.[0] || "",
          passwordError: backendErrors.password?.[0] || "",
          detailError: backendErrors.detail || "",
        });
      } else {
        console.log("Error message: ", error.message);
      }
    } finally {
      setIsSubmitting(false);
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
          {error.usernameError && (
            <p className="backend-error">{error.usernameError}</p>
          )}
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {error.passwordError && (
            <p className="backend-error">{error.passwordError}</p>
          )}
          {error.detailError && (
            <p className="backend-error">{error.detailError}</p>
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <motion.span
                className="submit-loader"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              >
                <Loader2 size={20} />
              </motion.span>
            ) : (
              "Login"
            )}
          </button>
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
