import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Internships from "./pages/Internships";
import InternshipPost from "./pages/InternshipPost";
import PostJob from "./pages/PostJob";
import CareerResources from "./pages/CareerResources";
import EmployerResources from "./pages/EmployerResources";
import ResumeBuilder from "./pages/ResumeBuilder";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Layout>
        <Routes>

          {/* Core Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Jobs */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-details" element={<JobDetails />} />

          {/* Internships */}
          <Route path="/internships" element={<Internships />} />
          <Route path="/internship-post" element={<InternshipPost />} />

          {/* Posting */}
          <Route path="/post-job" element={<PostJob />} />

          {/* Resources */}
          <Route path="/career-resources" element={<CareerResources />} />
          <Route path="/employer-resources" element={<EmployerResources />} />

          {/* Tools */}
          <Route path="/resume-builder" element={<ResumeBuilder />} />

          {/* Auth Pages */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Layout>
    </Router>
  );
}
