import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import SectionTitle from '../components/SectionTitle';
import Navbar from '../components/Navbar';
import AnimatedCounter from '../components/AnimatedCounter';
import DeviceShowcase from "../components/DeviceShowcase";

import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  Clock,
} from 'three';

// Assets (kept for future use)
const PHONE_MOCKUP_URL = '/images/phone-mockup.png';
const COMPANY_LOGOS = [
  '/images/logo-google.png',
  '/images/logo-microsoft.png',
  '/images/logo-amazon.png',
  '/images/logo-meta.png',
  '/images/logo-apple.png',
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

/**
 * Premium interactive floating-lines background for the hero
 * Uses Three.js + a custom shader + mouse parallax.
 */
const FloatingLinesHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0); // transparent, CSS gradient stays visible
    containerRef.current.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uMouse: { value: new Vector2(0.5, 0.5) },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Neon, layered waves + subtle noise + mouse parallax
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      // Brand-ish colors
      vec3 col1 = vec3(124.0/255.0, 93.0/255.0, 250.0/255.0);
      vec3 col2 = vec3(0.0/255.0, 181.0/255.0, 216.0/255.0);
      vec3 col3 = vec3(76.0/255.0, 201.0/255.0, 240.0/255.0);

      // simple hash noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0 - 2.0*f);
        return mix(a, b, u.x) +
               (c - a)*u.y*(1.0 - u.x) +
               (d - b)*u.x*u.y;
      }

      void main() {
        // Normalized coords (-1..1) center
        vec2 uv = vUv;
        vec2 p = (uv - 0.5) * 2.0;
        p.x *= uResolution.x / uResolution.y;

        // Mouse parallax
        vec2 m = (uMouse - 0.5) * 2.0;
        p.x += m.x * 0.15;
        p.y += m.y * 0.05;

        // Base gradient background (very soft, so it mixes with CSS gradient)
        float grad = smoothstep(-0.8, 0.8, p.y + 0.2);
        vec3 baseCol = mix(col1 * 0.25, col2 * 0.35, grad);

        // 3 layered flowing lines
        float t = uTime * 0.6;

        float line1 = abs(p.y - 0.25 * sin(p.x * 1.8 + t * 1.6));
        float line2 = abs(p.y + 0.15 * sin(p.x * 2.4 - t * 1.1));
        float line3 = abs(p.y - 0.05 * sin(p.x * 3.2 + t * 0.7 + 2.0));

        float width1 = 0.045;
        float width2 = 0.04;
        float width3 = 0.035;

        float glow1 = exp(-line1 * 16.0) * 1.2;
        float glow2 = exp(-line2 * 16.0);
        float glow3 = exp(-line3 * 18.0);

        // Noise along lines for energy feel
        float n = noise(p * 4.0 + t);
        glow1 *= 0.8 + 0.5 * n;
        glow2 *= 0.8 + 0.5 * n;
        glow3 *= 0.8 + 0.5 * n;

        vec3 c1 = col1 * glow1;
        vec3 c2 = col2 * glow2;
        vec3 c3 = col3 * glow3;

        // Combine
        vec3 color = baseCol;
        color += c1;
        color += c2;
        color += c3;

        // Subtle vignette
        float r = length(p);
        float vignette = smoothstep(1.2, 0.2, r);
        color *= vignette;

        gl_FragColor = vec4(color, 0.9);
      }
    `;

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();

    const resize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const width = clientWidth || 1;
      const height = clientHeight || 1;
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    resize();

    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener('pointermove', handlePointerMove);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerRef.current);

    let rafId;
    const renderLoop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="floating-lines-bg" />;
};

// Reusable FeatureCard component
const FeatureCard = ({ title, description, icon }) => (
  <motion.div className="feature-card" variants={fadeInUp}>
    <div className="feature-icon">{icon}</div>
    <h4 className="feature-card-title">{title}</h4>
    <p className="feature-card-desc">{description}</p>
  </motion.div>
);

const PersonaCard = ({ role, title, description, benefits, cta, accent }) => (
  <motion.div className="persona-card" style={{ borderColor: accent }} variants={fadeInUp}>
    <span className="role-label">{role}</span>
    <h4>{title}</h4>
    <p>{description}</p>
    <ul>
      {benefits.map((benefit) => (
        <li key={benefit}>{benefit}</li>
      ))}
    </ul>
    <div className="persona-cta">
      <Link to={cta.href} className="btn persona-btn">
        {cta.label}
      </Link>
    </div>
  </motion.div>
);

const OpportunityCard = ({ title, description, tags, jobs, accent }) => (
  <motion.div className="opportunity-card" style={{ borderTopColor: accent }} variants={fadeInUp}>
    <div className="opportunity-header">
      <h4>{title}</h4>
      <span>{jobs}+ roles</span>
    </div>
    <p>{description}</p>
    <div className="opportunity-tags">
      {tags.map((tag) => (
        <span key={tag} className="opportunity-chip">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

const WorkflowStep = ({ step, title, description }) => (
  <motion.div className="workflow-card" variants={fadeInUp}>
    <div className="workflow-number">{step}</div>
    <h4>{title}</h4>
    <p>{description}</p>
  </motion.div>
);

const SolutionCard = ({ title, detail, image }) => (
  <motion.article
    className="solution-card"
    variants={fadeInUp}
    style={{
      backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.4)), url(${image})`,
    }}
  >
    <h4>{title}</h4>
    <p>{detail}</p>
    <Link to="/solutions" className="btn btn-ghost">
      See how it works
    </Link>
  </motion.article>
);

const TestimonialCard = ({ quote, author, role }) => (
  <motion.div className="testimonial-card" variants={fadeInUp}>
    <p>{quote}</p>
    <div className="testimonial-meta">
      <strong>{author}</strong>
      <span>{role}</span>
    </div>
  </motion.div>
);

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className={`faq-item ${isOpen ? 'open' : ''}`} variants={fadeInUp}>
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <h4>{question}</h4>
        <motion.span
          className="faq-toggle"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="faq-answer"
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const features = [
  { title: 'Dual dashboards', description: 'Switch between seeker insights and provider controls in a single click.', icon: '🧭' },
  { title: 'Live HR chat', description: 'Connect through half-screen conversations vetted by ATS scores.', icon: '💬' },
  { title: 'ATS & analytics', description: 'See how your resume stacks up and get layered improvement advice.', icon: '📊' },
  { title: 'Opportunity board', description: 'Smartly curated roles with filters that remember your preferences.', icon: '🚀' },
];

const pulseMoments = [
  {
    spark: 'Live now · 12 recruiters online',
    title: 'Realtime chat requests',
    detail: '34 job seekers pinged HR this hour; 6 providers are preparing responses.',
  },
  {
    spark: 'ATS insights · updated 2m ago',
    title: 'ATS examiner running',
    detail: 'Candidates refreshed resumes for 210 roles and bumped match scores by 18% on average.',
  },
  {
    spark: 'Opportunity pulse · curated for you',
    title: 'Trending routes',
    detail: 'Product, Design, and GTM squads reopened 98 roles and added 42 internship slots.',
  },
];

const resourceHighlights = [
  {
    title: 'Resource Lab: Interactive guides',
    description: 'Step-by-step sessions that pair ATS prep with interview frameworks.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    cta: { href: '/news', label: 'Browse insights' },
  },
  {
    title: 'Community pulses & events',
    description: 'Live office hours, AMAs, and mock interviews hosted by industry HR leads.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    cta: { href: '/events', label: 'See events' },
  },
  {
    title: 'Success stories',
    description: 'Short reels that show how seekers converted chats into offers and providers closed talent.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    cta: { href: '/stories', label: 'Watch stories' },
  },
];

const personaCards = [
  {
    role: 'Job Seeker',
    title: 'Match with teams that move fast',
    description: 'Search curated roles, chat with hiring leaders, and keep your ATS score improving.',
    benefits: ['One-click apply & resume sync', 'Realtime chat with recruiters', 'Tracking across jobs and internships'],
    cta: { label: 'Browse Jobs', href: '/jobs' },
    accent: '#7C5DFA',
  },
  {
    role: 'Job Provider',
    title: 'Post, filter, and close candidates quicker',
    description: 'Capture the best leads, review ATS-ranked applications, and open chat windows the moment the seeker is ready.',
    benefits: ['ATS-score filtering', 'Chat request oversight', 'Insights & analytics dashboard'],
    cta: { label: 'Post a Role', href: '/provider' },
    accent: '#00B5D8',
  },
];

const opportunityCategories = [
  {
    title: 'Product Engineering',
    description: 'Autonomous teams shaping AI-native experiences for global audiences.',
    tags: ['Remote', 'Senior', 'Innovation'],
    jobs: 180,
    accent: '#ffb347',
  },
  {
    title: 'Design & UX',
    description: 'Inclusive design squads needing storytellers and system thinkers.',
    tags: ['Hybrid', 'Portfolio', 'Collaboration'],
    jobs: 95,
    accent: '#8fd3f4',
  },
  {
    title: 'Sales & GTM',
    description: 'High-energy teams building growth engines and partnerships.',
    tags: ['Field', 'Leadership', 'Target driven'],
    jobs: 120,
    accent: '#f78da7',
  },
  {
    title: 'Internships',
    description: 'Mentored internships with real ownership and mentorship.',
    tags: ['Early-career', 'Stipend', 'Mentorship'],
    jobs: 210,
    accent: '#6a82fb',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Choose your role',
    description: 'Pick seeker or provider once and every touchpoint on the platform adapts instantly.',
  },
  {
    step: '02',
    title: 'Search & queue',
    description: 'Run smart searches, filter by ATS readiness, and pin opportunities or requests to your dashboard.',
  },
  {
    step: '03',
    title: 'Connect & convert',
    description: 'Send chat requests, accept provider confirmations, and keep progress synced with ATS + news alerts.',
  },
];

const heroFilters = ['Remote friendly', 'Hybrid-ready', 'ATS proof', 'Early-career'];

const faqs = [
  {
    question: 'How does the dual experience work?',
    answer:
      'During signup or in the dashboard you can toggle between job seeker and job provider views. Each view surfaces tailored tools, dashboards, and CTAs for the role you are operating in.',
  },
  {
    question: 'What is the chat flow between seekers and providers?',
    answer:
      'After clicking Chat on a job, providers get a request checklist. Once they accept, both parties enter a half-screen chat pane and can continue the conversation without leaving the platform.',
  },
  {
    question: 'How are ATS scores and jobs synced?',
    answer:
      'Every submission is run through our ATS analyzer. Providers see applicants ordered by score, and seekers get personalized tips before they apply. You can also re-run scans after updating your resume or job filters.',
  },
];

const solutionCards = [
  {
    title: 'Optimized Talent Pipeline',
    detail: 'Auto-tag applicants and spotlight ATS-ready talent faster than ever.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Conversational Hiring',
    detail: 'Half-screen chat invites keep seekers engaged while providers stay in control.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Insight Stack',
    detail: 'Dashboards, ATS scores, and news pulses live together to reduce manual work.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
  },
];

const testimonials = [
  {
    quote:
      '“We cut recruitment cycle time in half. Live chat and ATS filtering keeps us organised and candidate-first.”',
    author: 'Priya Das',
    role: 'Head of Talent, AuroraLabs',
  },
  {
    quote:
      '“Job seekers feel seen. The customizable workflow helped us highlight internships that actually matched their goals.”',
    author: 'Rohan Mehta',
    role: 'Lead Seeker Experience',
  },
];

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('job seeker');
  const [searchMessage, setSearchMessage] = useState('Curating the right matches for your journey.');
  const [activePulse, setActivePulse] = useState(0);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionStatus('error');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus(null), 5000);
    } catch (error) {
      setSubscriptionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % pulseMoments.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    setSearchMessage(
      trimmed
        ? `${selectedRole === 'job seeker' ? 'Job seekers' : 'Job providers'} are exploring “${trimmed}”.`
        : `Showing curated ${selectedRole === 'job seeker' ? 'job seeker' : 'job provider'} experiences.`
    );
  };

  return (
    <>
      <Navbar />
      <main className="home-page">
        {/* HERO SECTION */}
        <header className="home-hero" role="banner">
          {/* Floating animated background */}
          <FloatingLinesHero />

          <div className="container hero-grid">
            <motion.div className="hero-left" initial="hidden" animate="visible" variants={stagger}>
              <motion.h1 className="hero-title" variants={fadeInUp}>
                <span className="gradient-text">Find Your Future,</span>
                <span>Faster.</span>
              </motion.h1>
              <motion.p className="hero-sub" variants={fadeInUp}>
                NiyuktiPath is your interactive career launchpad—bridging job seekers and providers with curated
                opportunities, ATS intelligence, and live conversations.
              </motion.p>
              <motion.div className="hero-ctas" variants={fadeInUp}>
                <Link to="/jobs" className="btn btn-primary">
                  Explore Openings
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Get Started
                </Link>
              </motion.div>
              {/* Stats block kept commented for now */}
              {/* <motion.div className="hero-stats" variants={stagger}>
                {stats.map((stat, index) => (
                  <motion.div key={index} className="stat" variants={fadeInUp}>
                    <strong>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </strong>
                    <span>{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div> */}
            </motion.div>

            <motion.div className="hero-right" initial="hidden" animate="visible" variants={stagger}>
              <div className="hero-panel">
                <p className="hero-panel-label">Interactive Workbench</p>
                <div className="hero-role-switch">
                  {['job seeker', 'job provider'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`hero-role-btn ${selectedRole === role ? 'active' : ''}`}
                      onClick={() => setSelectedRole(role)}
                    >
                      {role === 'job seeker' ? 'Job Seeker' : 'Job Provider'}
                    </button>
                  ))}
                </div>
                <form className="hero-search" onSubmit={handleHeroSearch}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={
                      selectedRole === 'job seeker'
                        ? 'Search jobs, skills, or companies'
                        : 'Search talent, ATS stats, or teams'
                    }
                    aria-label="Search roles or requests"
                  />
                  <button type="submit">Explore</button>
                </form>
                <div className="hero-quick-chips">
                  {heroFilters.map((chip) => (
                    <button
                      key={chip}
                      className="hero-chip-btn"
                      onClick={() => console.log('Clicked:', chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* PERSONA SECTION */}
        <section className="section persona-section" aria-label="Role experiences">
          <div className="container">
            <SectionTitle
              title="Two sides of NiyuktiPath"
              subtitle="Seamless tools for both job seekers and providers."
            />
            <motion.div
              className="persona-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {personaCards.map((card) => (
                <PersonaCard key={card.role} {...card} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* PULSE SECTION */}
        <section className="section pulse-section">
          <div className="container">
            <SectionTitle
              title="Platform Pulse"
              subtitle="Fresh activity from seekers and providers in one glance."
            />
            <div className="pulse-grid">
              <motion.div
                className="pulse-panel"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <p className="pulse-spark">{pulseMoments[activePulse].spark}</p>
                <h3>{pulseMoments[activePulse].title}</h3>
                <p className="pulse-detail">{pulseMoments[activePulse].detail}</p>
                <div className="pulse-actions">
                  <Link to="/chat" className="btn btn-tertiary">
                    Open chat console
                  </Link>
                </div>
              </motion.div>
              <div className="pulse-indicators">
                {pulseMoments.map((moment, index) => (
                  <button
                    key={moment.title}
                    type="button"
                    className={`pulse-indicator ${activePulse === index ? 'active' : ''}`}
                    onClick={() => setActivePulse(index)}
                  >
                    <span>{moment.title}</span>
                    <small>{moment.spark}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Phone component */}
        <DeviceShowcase />

        {/* RESOURCE SECTION */}
        <section className="section resource-section" aria-labelledby="resources">
          <div className="container">
            <SectionTitle
              title="More ways to stay ahead"
              subtitle="Guides, stories, and events that expand your playbook."
              id="resources"
            />
            <motion.div
              className="resource-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {resourceHighlights.map((resource) => (
                <motion.article
                  key={resource.title}
                  className="resource-card"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.3)), url(${resource.image})`,
                  }}
                  variants={fadeInUp}
                >
                  <div className="resource-content">
                    <p className="resource-label">NiyuktiPath Lab</p>
                    <h4>{resource.title}</h4>
                    <p>{resource.description}</p>
                    <Link to={resource.cta.href} className="btn btn-outline-light">
                      {resource.cta.label}
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section className="section solutions-section" aria-labelledby="solutions">
          <div className="container">
            <SectionTitle
              title="Solutions inspired by HireSphere"
              subtitle="Automation, chat, and insights designed for modern recruiters."
              id="solutions"
            />
            <motion.div
              className="solutions-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {solutionCards.map((solution) => (
                <SolutionCard key={solution.title} {...solution} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIAL SECTION */}
        <section className="section testimonial-section" aria-label="Testimonials">
          <div className="container">
            <SectionTitle
              title="Success stories"
              subtitle="Communities that love the modern, responsive experience."
            />
            <motion.div
              className="testimonial-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.author} {...testimonial} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* WORKFLOW SECTION */}
        <section className="section workflow-section" aria-labelledby="workflow">
          <div className="container">
            <SectionTitle
              title="How it flows"
              subtitle="Your journey—guided from first click to meaningful conversations."
              id="workflow"
            />
            <motion.div
              className="workflow-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {workflowSteps.map((step) => (
                <WorkflowStep key={step.step} {...step} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="section features-section" aria-labelledby="features">
          <div className="container">
            <SectionTitle
              title="Your Ultimate Career Toolkit"
              subtitle="Everything you need to succeed in your job search."
              id="features"
            />
            <motion.div
              className="features-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        {/* <section className="section faq-section" aria-labelledby="faq">
          <div className="container">
            <SectionTitle
              title="Have Questions?"
              subtitle="We've got answers. Here are some of the most common queries."
              id="faq"
            />
            <motion.div
              className="faq-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Home;
