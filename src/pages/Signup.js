import React, { useState, useEffect } from "react";
import "../styles/signup.css";
import { Link } from "react-router-dom";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80"
];

export default function Signup() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* HERO SECTION */}
        <div 
          className="signup-hero" 
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(99, 102, 241, 0.4), rgba(15, 23, 42, 0.8)), url(${HERO_IMAGES[currentImage]})` }}
        >
          <h2 className="logo">Niyukti</h2>
          <div className="hero-content">
            <h1 className="hero-title">Start your journey today</h1>
            <p className="hero-subtitle">
              Create an account to explore personalized career opportunities.
            </p>
            <div className="carousel-indicators">
              {HERO_IMAGES.map((_, index) => (
                <span 
                  key={index} 
                  className={`indicator ${index === currentImage ? "active" : "inactive"}`}
                  onClick={() => setCurrentImage(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="signup-form-section">
          <h1 className="form-title">Create account</h1>
          <form className="signup-form">
            <div className="form-group">
              <label>FULL NAME</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label>EMAIL ADDRESS</label>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>PASSWORD</label>
              <input type="password" placeholder="Enter password" required />
            </div>
            <button type="submit" className="signup-btn">Create account</button>
          </form>
          <div className="form-footer">
            <p className="signin-text">
              Already have an account?
              <Link to="/signin"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
