import React from "react";
import { motion } from "framer-motion";
import "../styles/deviceShowcase.css";

// Animation variants
const staggerList = {
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const phoneTilt = {
  animate: {
    rotate: [-2, 2, -2],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 3,
      ease: "easeInOut",
    },
  },
};

const DeviceShowcase = () => {
  return (
    <section className="device-section">
      <motion.div
        className="device-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        variants={staggerList}
      >
        {/* Left Feature Cards */}
        <div className="device-features">
          {[
            "Live hiring insights",
            "Smart match notifications",
            "ATS score improvement",
          ].map((text) => (
            <motion.div
              key={text}
              className="device-card"
              variants={fadeSlideLeft}
            >
              {text}
            </motion.div>
          ))}
        </div>

        {/* Center Phone */}
        <motion.div
          className="device-phone"
          variants={phoneTilt}
          animate="animate">
          <img src="/images/phone.png" alt="Mobile UI Mockup" />
          <div className="phone-glow"></div>
        </motion.div>

        {/* Right Feature Cards */}
        <div className="device-features">
          {[
            "Chat-based recruiting",
            "Real-time ATS scoring",
            "Instant candidate replies",
          ].map((text) => (
            <motion.div
              key={text}
              className="device-card"
              variants={fadeSlideRight}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DeviceShowcase;
