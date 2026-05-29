import React, { useState, useEffect } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

const HERO_IMAGES = [
  "/images/sign-in.svg",
  "/images/sign-in2.png",
  "/images/sign-in3.svg"
];

export default function Signup() {
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] =
    useState(0);

  const [role, setRole] =
    useState("job_seeker");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      college_name: "",
      company_name: "",
      password: "",
      confirm_password: ""
    });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage(
        (prev) =>
          (prev + 1) %
          HERO_IMAGES.length
      );
    }, 5000);

    return () =>
      clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value
    }));
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "http://localhost:8000/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              ...formData,
              role
            })
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.detail ||
            "Signup failed"
        );
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert(
        "Account created successfully"
      );

      // Redirect to home page
      navigate("/");

    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        <div
          className="signup-hero"
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
              Start your journey today
            </h1>

            <p className="hero-subtitle">
              Create an account to
              explore personalized
              career opportunities.
            </p>

            <div className="carousel-indicators">
              {HERO_IMAGES.map(
                (_, index) => (
                  <span
                    key={index}
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

        <div className="signup-form-section">
          <h1 className="form-title">
            Create account
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
            className="signup-form"
            onSubmit={
              handleSubmit
            }
          >
            <div className="form-group">
              <label>
                FULL NAME
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                EMAIL ADDRESS
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

            {/* Dynamic field */}
            <div className="form-group">
              <label>
                {role ===
                "job_seeker"
                  ? "COLLEGE NAME"
                  : "COMPANY NAME"}
              </label>

              <input
                type="text"
                name={
                  role ===
                  "job_seeker"
                    ? "college_name"
                    : "company_name"
                }
                placeholder={
                  role ===
                  "job_seeker"
                    ? "Enter college name"
                    : "Enter company name"
                }
                value={
                  role ===
                  "job_seeker"
                    ? formData.college_name
                    : formData.company_name
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
                  placeholder="Enter password"
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

            <div className="form-group password-group">
              <label>
                CONFIRM PASSWORD
              </label>

              <div className="input-with-icon">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm password"
                  value={
                    formData.confirm_password
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
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="signup-btn"
              disabled={
                loading
              }
            >
              {loading
                ? "Creating..."
                : `Create ${
                    role ===
                    "job_seeker"
                      ? "Candidate"
                      : "Recruiter"
                  } Account`}
            </button>
          </form>

          <div className="form-footer">
            <p className="signin-text">
              Already have an
              account?
              <Link to="/signin">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

