import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Internships from "./pages/Internships";
import InternshipDetails from "./pages/InternshipDetails";
import InternshipPost from "./pages/InternshipPost";
import PostJob from "./pages/PostJob";
import CareerResources from "./pages/CareerResources";
import EmployerResources from "./pages/EmployerResources";
import ResumeBuilder from "./pages/ResumeBuilder";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import CandidateProfile from "./pages/CandidateProfile";
import RecruiterProfile from "./pages/RecruiterProfile";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Auth pages WITHOUT Layout */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* All pages WITH Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        <Route
          path="/jobs"
          element={
            <Layout>
              <Jobs />
            </Layout>
          }
        />

        <Route
          path="/job-details"
          element={
            <Layout>
              <JobDetails />
            </Layout>
          }
        />

        <Route
          path="/internships"
          element={
            <Layout>
              <Internships />
            </Layout>
          }
        />

        <Route
          path="/internship-details"
          element={
            <Layout>
              <InternshipDetails />
            </Layout>
          }
        />

        <Route
          path="/internship-post"
          element={
            <Layout>
              <InternshipPost />
            </Layout>
          }
        />

        <Route
          path="/post-job"
          element={
            <Layout>
              <PostJob />
            </Layout>
          }
        />

        <Route
          path="/career-resources"
          element={
            <Layout>
              <CareerResources />
            </Layout>
          }
        />

        <Route
          path="/employer-resources"
          element={
            <Layout>
              <EmployerResources />
            </Layout>
          }
        />

        <Route
          path="/resume-builder"
          element={
            <Layout>
              <ResumeBuilder />
            </Layout>
          }
        />

        <Route
          path="/profile/candidate"
          element={
            <Layout>
              <CandidateProfile />
            </Layout>
          }
        />
        <Route
          path="/profile/candidate/:userId"
          element={
            <Layout>
              <CandidateProfile />
            </Layout>
          }
        />

        <Route
          path="/profile/recruiter"
          element={
            <Layout>
              <RecruiterProfile />
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
} 