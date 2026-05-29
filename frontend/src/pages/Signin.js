import React, { useState, useEffect } from "react";
import "../styles/signin.css";
import {
  Link,
  useNavigate
} from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const HERO_IMAGES = [
  "/images/sign-in.svg",
  "/images/sign-in2.png",
  "/images/sign-in3.svg"
];

export default function Signin() {
  const navigate =
    useNavigate();

  const [currentImage,
    setCurrentImage] =
    useState(0);

  const [role,
    setRole] =
    useState("job_seeker");

  const [loading,
    setLoading] =
    useState(false);

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: ""
    });

  useEffect(() => {
    const timer =
      setInterval(() => {
        setCurrentImage(
          (prev) =>
            (prev + 1) %
            HERO_IMAGES.length
        );
      }, 5000);

    return () =>
      clearInterval(timer);
  }, []);

  // Handle input changes
  const handleChange = (
    e
  ) => {
    setFormData(
      (prev) => ({
        ...prev,
        [e.target.name]:
          e.target.value
      })
    );
  };

  // Handle login
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await fetch(
            "http://localhost:8000/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body:
                JSON.stringify(
                  formData
                )
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
        ) {
          alert(
            data.detail ||
              "Login failed"
          );
          return;
        }

        // role validation
        if (
          data.user.role !==
          role
        ) {
          alert(
            `This account belongs to ${
              data.user.role ===
              "job_seeker"
                ? "Candidate"
                : "Recruiter"
            }`
          );

          return;
        }

        // Save token
        localStorage.setItem(
          "token",
          data.token
        );

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        );

        alert(
          "Login successful"
        );

        // Redirect to home page
        navigate("/");

      } catch (error) {
        console.error(
          error
        );

        alert(
          "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="signin-page">
      <div className="signin-container">

        {/* HERO SECTION */}
        <div
          className="signin-hero"
          style={{
            backgroundImage:
              `linear-gradient(to bottom, rgba(99, 102, 241, 0.4), rgba(15, 23, 42, 0.8)), url(${HERO_IMAGES[currentImage]})`
          }}
        >
          <h2 className="logo">
            NiyuktiPath
          </h2>

          <div className="hero-content">
            <h1 className="hero-title">
              Unlock your
              career
              potential
            </h1>

            <p className="hero-subtitle">
              Join thousands
              of
              professionals
              finding their
              path with
              Niyukti.
            </p>

            <div className="carousel-indicators">
              {HERO_IMAGES.map(
                (
                  _,
                  index
                ) => (
                  <span
                    key={
                      index
                    }
                    className={`indicator ${
                      index ===
                      currentImage
                        ? "active"
                        : "inactive"
                    }`}
                    onClick={() =>
                      setCurrentImage(
                        index
                      )
                    }
                  ></span>
                )
              )}
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="signin-form-section">
          <h1 className="form-title">
            Sign In
          </h1>

          <div className="role-selection">
            <button
              type="button"
              className={`role-tab ${
                role ===
                "job_seeker"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setRole(
                  "job_seeker"
                )
              }
            >
              Candidate
            </button>

            <button
              type="button"
              className={`role-tab ${
                role ===
                "job_provider"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setRole(
                  "job_provider"
                )
              }
            >
              Recruiter
            </button>
          </div>

          <form
            className="signin-form"
            onSubmit={
              handleSubmit
            }
          >
            <div className="form-group">
              <label>
                EMAIL
                ADDRESS
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group password-group">
              <label>
                PASSWORD
              </label>

              <div className="input-with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
                <button
                  type="button"
                  className="visibility-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="signin-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Signing In..."
                : `Sign In as ${
                    role ===
                    "job_seeker"
                      ? "Candidate"
                      : "Recruiter"
                  }`}
            </button>
          </form>

          <div className="form-footer">
            <p className="signup-text">
              Don't have an
              account?
              <Link to="/signup">
                {" "}
                Create
                account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
