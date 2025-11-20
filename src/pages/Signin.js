import React from "react";
import "../styles/signin.css";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="signin-page">

      {/* HERO */}
      <section className="signin-hero">
        <div className="container">
          <h1>Welcome Back</h1>
          <p>Login to continue your journey with Niyukti.</p>
        </div>
      </section>

      {/* SIGNIN FORM */}
      <section className="section">
        <div className="container">
          <div className="signin-form">

            <h2 className="form-title">Sign In</h2>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>

            <button className="btn signin-btn">Login</button>

            <p className="signup-text">
              Don't have an account?
              <Link to="/signup"> Create account</Link>
            </p>

          </div>
        </div>
      </section>

    </div>
  );
}
