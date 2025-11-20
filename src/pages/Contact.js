import React from "react";
import "../styles/contact.css";

export default function Contact() {
  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We’re here to help. Reach out to us anytime.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Get in Touch</h2>

          <div className="contact-grid">

            <div className="contact-card">
              <i className="fa-solid fa-envelope"></i>
              <h3>Email</h3>
              <p>support@niyukti.com</p>
            </div>

            <div className="contact-card">
              <i className="fa-solid fa-phone"></i>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div className="contact-card">
              <i className="fa-solid fa-location-dot"></i>
              <h3>Location</h3>
              <p>New Delhi, India</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <h2 className="section-title">Send a Message</h2>

          <form className="contact-form">

            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Write your message"></textarea>
            </div>

            <button className="btn primary-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with latest job opportunities & career tips.</p>

          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn">Subscribe</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <h2>Want to Start Your Career Journey?</h2>
          <p>Join thousands of candidates who trust Niyukti.</p>
          <a href="/signup" className="btn cta-btn">Create Account</a>
        </div>
      </section>

    </div>
  );
}
