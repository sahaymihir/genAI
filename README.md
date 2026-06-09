# genAI

A MERN stack AI interview prep tool that generates a structured AI interview report based on your resume and a job description.

![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

## Table of Contents
- [What it does](#what-it-does)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)

## What it does
The user uploads a PDF resume and provides an optional self-description and job description. The AI analyzes these inputs and generates a structured interview preparation report.

The generated report includes the following fields:
- `matchScore`: A numerical score indicating how well the resume matches the job description.
- `technicalQuestions`: A list of potential technical questions based on the job description and the candidate's skills.
- `behavioralQuestions`: A list of potential behavioral questions.
- `skillGaps`: Identified gaps in the candidate's skills, with a severity enum (`low`, `medium`, `high`).
- `preparationPlan`: A structured plan to help the candidate prepare for the interview.

## Tech Stack

| Backend | Version | Frontend | Version |
| ------- | ------- | -------- | ------- |
| express | ^5.2.1 | react | ^19.2.6 |
| mongoose | ^9.6.3 | react-dom | ^19.2.6 |
| groq-sdk | ^1.2.1 | react-router | ^7.16.0 |
| openai | ^6.42.0 | tailwindcss | ^4.3.0 |
| @google/genai | ^2.8.0 | @tailwindcss/vite | ^4.3.0 |
| pdf-parse | ^2.4.5 | axios | ^1.17.0 |
| multer | ^2.1.1 | lucide-react | ^1.17.0 |
| bcrypt | ^6.0.0 | react-toastify | ^11.1.0 |
| jsonwebtoken | ^9.0.3 | shadcn | ^4.10.0 |
| cookie-parser | ^1.4.7 | vite | ^8.0.12 |
| cors | ^2.8.6 | tw-animate-css | ^1.4.0 |
| zod | ^4.4.3 | @base-ui/react | ^1.5.0 |

## Project Structure

```text
.
├── backend/                  # Express/Node.js Backend
│   ├── package.json          # Backend dependencies and scripts
│   ├── server.js             # Entry point for the server
│   └── src/
│       ├── app.js            # Express app configuration
│       ├── config/           # Configuration files (e.g., database)
│       ├── controllers/      # Route controllers (auth, interview)
│       ├── middleware/       # Custom middleware (auth, error, upload)
│       ├── models/           # Mongoose schemas
│       ├── routes/           # API routes definition
│       ├── services/         # Business logic (e.g., AI integration)
│       └── utils/            # Helper functions
└── frontend/                 # React Frontend
    ├── package.json          # Frontend dependencies and scripts
    ├── public/               # Static assets
    ├── src/
    │   ├── App.jsx           # Main application component
    │   ├── appRoutes.jsx     # Routing definitions
    │   ├── components/       # Reusable UI components (shadcn/ui)
    │   ├── features/         # Feature-based modules (e.g., auth pages, hooks)
    │   ├── lib/              # Utility libraries
    │   ├── index.css         # Global styles (Tailwind)
    │   └── main.jsx          # React entry point
    └── vite.config.js        # Vite configuration
```

## Prerequisites
- Node >= 20
- MongoDB
- Groq API key

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd genAI
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev    # runs 'nodemon server.js'
   # or 'npm start' to run 'node server.js'
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev    # runs 'vite'
   ```

## Environment Variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `PORT` | No | Port for the backend server |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign JSON Web Tokens |
| `NODE_ENV` | No | Node environment (e.g., development, production) |
| `GROQ_API_KEY` | Yes | API key for Groq AI services |

## API Reference

<details>
<summary><code>POST /api/auth/register</code></summary>

- **Description:** Register a new user
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response Shape:**
  ```json
  {
    "msg": "User Created Successfully",
    "user": {
      "_id": "...",
      "username": "user123",
      "email": "user@example.com"
    }
  }
  ```
</details>

<details>
<summary><code>POST /api/auth/login</code></summary>

- **Description:** Login a user
- **Auth Required:** No
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response Shape:**
  ```json
  {
    "msg": "User Logged In Successfully",
    "user": {
      "_id": "...",
      "username": "user123",
      "email": "user@example.com"
    }
  }
  ```
</details>

<details>
<summary><code>POST /api/auth/logout</code></summary>

- **Description:** Logout a user
- **Auth Required:** Yes
- **Request Body:** None
- **Response Shape:**
  ```json
  {
    "msg": "User logged out successfully"
  }
  ```
</details>

<details>
<summary><code>GET /api/auth/profile</code></summary>

- **Description:** Get User details
- **Auth Required:** Yes
- **Request Body:** None
- **Response Shape:**
  ```json
  {
    "msg": "User details fetched successfully",
    "user": {
      "_id": "...",
      "username": "user123",
      "email": "user@example.com"
    }
  }
  ```
</details>

<details>
<summary><code>POST /api/interview/resume</code></summary>

- **Description:** Upload a resume and generate an AI interview report
- **Auth Required:** Yes
- **Request Format:** `multipart/form-data`
- **Request Body:**
  - `resume`: PDF file (required)
  - `selfDescription`: string (optional)
  - `jobDescription`: string (optional)
- **Response Shape:**
  ```json
  {
    "msg": "Interview Report Generated Successfully",
    "data": {
      "_id": "...",
      "user": "...",
      "resume": "...",
      "selfDescription": "...",
      "jobDescription": "...",
      "matchScore": 85,
      "technicalQuestions": ["..."],
      "behavioralQuestions": ["..."],
      "skillGaps": [
        {
          "skill": "React",
          "severity": "medium"
        }
      ],
      "preparationPlan": "..."
    }
  }
  ```
</details>
