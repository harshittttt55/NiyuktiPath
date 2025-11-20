import React from "react";
import "../styles/section-title.css";

export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title-container">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
