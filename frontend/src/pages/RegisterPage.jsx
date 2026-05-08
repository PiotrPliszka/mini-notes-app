import React from "react";
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import icon from "../assets/house.svg";
import "./RegisterPage.css";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirm_passwordError: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    setError({
      usernameError: "",
      emailError: "",
      passwordError: "",
      confirm_passwordError: "",
    });
    if (user.password !== user.confirm_password) {
      setError({
        usernameError: "",
        emailError: "",
        passwordError: "Password don't match",
        confirm_passwordError: "Password don't match",
      });
      setIsSubmitting(false);
      return;
    }
    try {
      await api.post("auth/register/", user);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const backendErrors = error.response.data;
        console.error("Error data: ", error.response.data);
        setError({
          usernameError: backendErrors.username[0] || "",
          emailError: backendErrors.email[0] || "",
          passwordError: backendErrors.password[0] || "",
          confirm_passwordError: backendErrors.confirm_password[0] || "",
        });
      } else {
        console.error("Error message: ", error.message);
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
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {error.emailError && (
            <p className="backend-error">{error.emailError}</p>
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
          <label>Confrim Password</label>
          <input
            type="password"
            name="confirm_password"
            value={user.confirm_password}
            onChange={handleChange}
          />
          {error.confirm_passwordError && (
            <p className="backend-error">{error.confirm_passwordError}</p>
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
              "Create"
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
