import React from "react";
import { motion } from "framer-motion";
import "../styles/about.css";

export default function About() {
  return (
    <div className="about-advanced">

      {/* HERO */}
      <motion.section
        className="hero-advanced"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h1>Your Career Journey, Elevated.</h1>
          <p>
            Niyukti bridges talent, ambition and real opportunities with
            design-first experience and modern hiring intelligence.
          </p>
        </div>

        {/* Floating shapes */}
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </motion.section>

      {/* STORY SECTION */}
      <section className="story-split">
        <div className="container split-grid">
          <motion.div
            className="split-image"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          ></motion.div>

          <motion.div
            className="split-content"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2>We Believe in People First</h2>
            <p>
              Our platform empowers seekers and employers equally with
              intelligence, transparency and delightful interaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES / GLASS CARD SECTION */}
      <section className="values-premium">
        <div className="container">
          <h2 className="center">Our Core Values</h2>

          <div className="glass-grid">
            {[
              "Opportunity Access",
              "Skill Acceleration",
              "Human-Centered Design",
              "Community Growth",
            ].map((title) => (
              <motion.div
                key={title}
                className="glass-card"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring" }}
              >
                <h3>{title}</h3>
                <p>
                  We design technology that brings people closer to meaningful
                  careers and hiring outcomes.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STAT COUNTERS */}
      <section className="stats-section">
        <div className="container stats-grid">
          {[
            { num: "50K+", label: "Users" },
            { num: "1.2K+", label: "Employers" },
            { num: "97%", label: "Success Rate" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>{stat.num}</h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-premium">
        <div className="container">
          <h2 className="center">Leadership Team</h2>

          <div className="team-grid">
            {[
              { name: "Shristi Shrivastava", position: "Founder & CEO", photo: "/images/Shristi.jpeg" },
              { name: "Harshit Sharma", position: "Co-Founder & CTO", photo: "/images/Harshit.jpeg"},
              { name: "Sujal Jain", position: "Chief Operations Officer", photo: "/images/Sujal.jpeg"}
            ].map((member) => (
              <motion.div
                key={member.name}
                className="team-premium-card"
                whileHover={{ y: -6 }}
              >
                <div className="team-photo" style={{ backgroundImage: `url(${member.photo})` }}></div>

                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-premium">
        <div className="container">
          <h2>Want to Build the Future With Us?</h2>
          <button>Explore Careers</button>
        </div>
      </section>

    </div>
  );
}
