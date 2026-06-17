# CareerCanvas AI

## Overview

CareerCanvas AI is an AI-powered career planning platform designed to help students and early professionals build structured career roadmaps, track internships, manage goals, analyze skill growth, and receive personalized career recommendations.

The platform combines interactive planning tools, analytics dashboards, AI-driven insights, and full-stack user management into a single modern application.

---

## Problem Statement

Students often struggle with career planning due to fragmented resources, unclear roadmaps, and lack of progress tracking. CareerCanvas AI addresses this challenge by providing a centralized platform that guides users through career exploration, skill development, internship tracking, and goal achievement.

---

## Key Features

### Career Roadmap Generator

* Generates personalized career roadmaps based on user interests.
* Supports multiple technology and professional career paths.
* Provides structured learning milestones and progression tracking.

### Kanban Task Planner

* Drag-and-drop task management system.
* Organizes milestones into customizable workflow stages.
* Helps users manage learning activities and career objectives.

### Internship Tracker

* Tracks internship and job applications.
* Maintains application status pipelines.
* Supports CRUD operations and CSV export functionality.

### Goal Tracking System

* Tracks personal and professional goals.
* Displays progress indicators and completion metrics.
* Includes streak tracking and achievement celebrations.

### Analytics Dashboard

* Visualizes user progress and activity.
* Provides insights through interactive charts and reports.
* Enables data-driven career planning.

### Skills Assessment Dashboard

* Interactive radar chart for skill evaluation.
* Real-time updates based on user input.
* Identifies strengths and improvement areas.

### AI Recommendation Engine

* Provides career suggestions and learning recommendations.
* Integrates with Gemini API for intelligent guidance.
* Generates personalized development strategies.

### User Profile Management

* Editable user profiles.
* Avatar upload functionality.
* PDF export support.

### Authentication System

* JWT-based secure authentication.
* Login and registration functionality.
* Guest mode support.
* Protected routes and session management.

### Responsive User Experience

* Mobile-first responsive design.
* Dark mode support.
* Smooth animations and transitions.

---

## System Architecture

Frontend (React + Vite)

* User Interface
* State Management
* Routing
* Data Visualization
* Theme Management

Backend (Node.js + Express)

* Authentication APIs
* User Management APIs
* Internship APIs
* Goal Management APIs
* Recommendation Services

Database (MongoDB)

* User Data
* Career Progress
* Goals
* Internship Applications
* Skills Assessment Records

---

## Technology Stack

### Frontend

* React 18
* Vite 5
* React Router DOM
* Framer Motion
* Recharts
* React Hook Form
* Lucide React
* React Toastify
* @hello-pangea/dnd
* Canvas Confetti

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

### APIs & Integrations

* Gemini API
* OpenAI API
* REST APIs

---

## Project Structure

```text
careercanvas-ai/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── layouts/
│   ├── constants/
│   ├── data/
│   └── styles/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── public/
├── package.json
└── README.md
```

---

## Application Workflow

1. User Registration and Authentication
2. Career Path Selection
3. Roadmap Generation
4. Goal Creation and Tracking
5. Internship Management
6. Skill Assessment
7. Analytics Visualization
8. AI-Powered Recommendations
9. Progress Monitoring

---

## Security Features

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Session Persistence
* Environment Variable Management

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## Learning Outcomes

This project provided hands-on experience in:

* Full-Stack Web Development
* REST API Development
* Authentication and Authorization
* React Context API
* State Management
* Dashboard Design
* Data Visualization
* MongoDB Data Modeling
* AI API Integration
* Responsive UI/UX Design
* Modern Frontend Architecture

---

## Future Enhancements

* Resume Builder
* Interview Preparation Module
* Job Recommendation Engine
* AI Mock Interviews
* Multi-language Support
* Real-time Collaboration Features
* Advanced Learning Analytics

---

## Repository Contents

```text
frontend/        → React application
backend/         → Express API server
README.md        → Project documentation
```

---

## Author

Mohd Anas Javed Khan

GitHub:
https://github.com/Anas-Javed362

LinkedIn:
https://www.linkedin.com/in/anas-javed-khan-4019262b6
