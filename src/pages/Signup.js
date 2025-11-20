import React from "react";
import "../styles/signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="signup-page">

      {/* HERO */}
      <section className="signup-hero">
        <div className="container">
          <h1>Create an Account</h1>
          <p>Join Niyukti and start your career journey.</p>
        </div>
      </section>

      {/* SIGNUP FORM */}
      <section className="section">
        <div className="container">
          <div className="signup-form">

            <h2 className="form-title">Sign Up</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter password" />
            </div>

            <button className="btn signup-btn">Create Account</button>

            <p className="signin-text">
              Already have an account?
              <Link to="/signin"> Sign in</Link>
            </p>

          </div>
        </div>
      </section>

    </div>
  );
}
