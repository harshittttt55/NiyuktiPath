import React from "react";
import "../styles/contact.css";
import DarkVeil from '../components/DarkVeil';
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="darkveil-wrapper">
          <DarkVeil />
        </div>
        <motion.div 
          className="container hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Get in <span className="highlight">Touch</span></h1>
          {/* <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p> */}
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container overflow-visible">
          <div className="contact-wrapper">
            {/* Left: Info Side */}
            <motion.div 
              className="contact-info-panel"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="info-header">
                <h2>Contact Information</h2>
                <p>Fill out the form and our team will get back to you within 24 hours.</p>
              </div>

              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon"><FaPhoneAlt /></div>
                  <div className="info-text">
                    <span>Call Us</span>
                    <p>+91 98765 43210</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaEnvelope /></div>
                  <div className="info-text">
                    <span>Email Us</span>
                    <p>support@niyuktipath.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaMapMarkerAlt /></div>
                  <div className="info-text">
                    <span>Visit Us</span>
                    <p>Niyukti Tower, New Delhi, India</p>
                  </div>
                </div>
              </div>

              <div className="social-links">
                <a href="#" className="social-btn"><FaTwitter /></a>
                <a href="#" className="social-btn"><FaLinkedinIn /></a>
                <a href="#" className="social-btn"><FaGithub /></a>
                <a href="#" className="social-btn"><FaInstagram /></a>
              </div>
            </motion.div>

            {/* Right: Form Side */}
            <motion.div 
              className="contact-form-panel"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form className="premium-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Tell us how we can help..."></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or Newsletter Section */}
      {/* <section className="newsletter-section">
        <div className="container">
          <motion.div 
            className="newsletter-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="newsletter-content">
              <h3>Stay in the Loop</h3>
              <p>Subscribe to our newsletter for the latest job openings and career advice.</p>
              <div className="newsletter-form-modern">
                <input type="email" placeholder="Enter your email" />
                <button className="btn-glow">Subscribe</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
