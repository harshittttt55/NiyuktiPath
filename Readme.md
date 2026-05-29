# NiyuktiPath – Job & Internship Portal (React)

NiyuktiPath is a modern job and internship platform built using **React**, featuring:

✔ A hover-expand modern sidebar  
✔ Fully responsive UI  
✔ Modern card-based design  
✔ 13 fully built pages  
✔ Modular components  
✔ Clean folder structure  
✔ React Router v6  
✔ React Icons  

---

## 🚀 Features

- Job listings + job details
- Internship listings + internship details
- Resume builder
- Employer resources
- Career resources
- Authentication pages (Signin / Signup)
- Modern Layout with Sidebar + Footer
- Components for reusability (JobCard, InternshipCard, SectionTitle)

---

## 📂 Project Structure

```text
NiyuktiPath/
├── backend/                    # Python/FastAPI Backend
│   ├── app/
│   │   ├── config/             # Configuration & DB Connection
│   │   │   ├── database.py     # MongoDB connection logic
│   │   │   └── settings.py     # App settings & env variables
│   │   ├── models/             # Database Models
│   │   │   └── user_model.py   # User database schema
│   │   ├── routes/             # API Endpoints
│   │   │   └── auth_routes.py  # Authentication routes (Login/Signup)
│   │   ├── schemas/            # Pydantic Validation Schemas
│   │   │   ├── auth_schema.py
│   │   │   └── user_schema.py
│   │   ├── services/           # Business Logic
│   │   │   └── auth_service.py # Auth handling logic
│   │   ├── utils/              # Helper Utilities
│   │   │   ├── hash.py         # Password hashing
│   │   │   └── jwt_handler.py  # JWT token generation/validation
│   │   └── main.py             # FastAPI Entry Point
│   ├── .env                    # Backend environment variables
│   └── requirements.txt         # Backend dependencies
├── public/                     # Static Assets
│   ├── images/                 # Portal images and icons
│   │   ├── Harshit.jpeg
│   │   ├── Sujal.jpeg
│   │   ├── about-banner.jpg
│   │   └── phone.png
│   ├── index.html              # Main HTML entry
│   └── _redirects              # Deployment redirects
├── src/                        # React Frontend
│   ├── components/             # Reusable UI Components
│   │   ├── AnimatedCounter.js
│   │   ├── DarkVeil.js
│   │   ├── DeviceShowcase.js
│   │   ├── Footer.js
│   │   ├── InternshipCard.js
│   │   ├── JobCard.js
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   ├── SectionTitle.js
│   │   └── Sidebar.js
│   ├── pages/                  # Main Application Pages
│   │   ├── About.js
│   │   ├── CareerResources.js
│   │   ├── Contact.js
│   │   ├── EmployerResources.js
│   │   ├── Home.js
│   │   ├── InternshipPost.js
│   │   ├── Internships.js
│   │   ├── JobDetails.js
│   │   ├── Jobs.js
│   │   ├── PostJob.js
│   │   ├── ResumeBuilder.js
│   │   ├── Signin.js
│   │   └── Signup.js
│   ├── styles/                 # CSS Styling (Modular & Global)
│   │   ├── global.css          # Global resets and variables
│   │   ├── home.css
│   │   ├── navbar.css
│   │   ├── sidebar.css
│   │   └── ... (20+ more styles)
│   ├── utils/                  # Frontend Utilities
│   │   ├── api.js              # API calling wrapper (Axios/Fetch)
│   │   └── format.js           # Data formatting helpers
│   ├── app.js                  # Main App component & Routing
│   ├── index.js                # React entry point
│   └── reportWebVitals.js
├── .env                        # Global/Frontend env variables
├── .gitignore
├── package.json                # Frontend dependencies & scripts
└── Readme.md                   # Documentation
```
