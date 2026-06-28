# First Intern - Internship Portal

First Intern is a highly polished, interactive, client-side internship search and application tracking portal designed specifically for Kuwaiti graduates. It serves as a modern bridge connecting talented local graduates with prime opportunities, built with React, Vite, and styled dynamically with Tailwind CSS.

---

## 🔒 Security & Secrets Warning

This application operates completely on the client-side with offline-first local state persistence (`localStorage`). There are **no backend databases, credentials, or API keys** (such as Google Gemini, Database URLs, or Auth tokens) embedded in the code.

It is **100% safe** to push this repository directly to a public or private GitHub repository without risking credential leaks.

---

## 🚀 Quick Start (Local Setup)

To run the application locally on your computer, follow these simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed on your system.

### 1. Install Dependencies
Navigate into the project root directory and install the necessary dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the local Vite development server:
```bash
npm run dev
```

### 3. Open the Application
Once the server is running, open your web browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Build and Deploying to Production

To generate optimized production static files, run:
```bash
npm run build
```
This compiles your React TypeScript application and generates a self-contained static site inside the `dist/` directory, which can be deployed to static hosting platforms such as Vercel, Netlify, GitHub Pages, or Firebase Hosting.

---

## ✨ Features Checklist

* **Interactive Search & Advanced Filters**: Real-time filtering by keyword (title, company, skills, description), location (e.g. Al Asimah, Hawally, Mubarak Al-Kabeer), and eligibility (e.g. Fresh Graduates, Undergraduates, Diplomates).
* **Local Sandboxed Accounts**: Simulated secure login and registration. Users can sign in or create an account to persist their personal list of saved and applied internships securely within their browser's storage.
* **Instant State Reset**: Effortlessly clear all search states, inputs, and active filters at any time by simply clicking the **First Intern** logo in the header.
* **Job Detail Sheets**: Rich interactive modals and sidebars revealing requirements, key responsibilities, and application submission portals.
* **Post a New Role**: Empower employers to submit custom internship details with automatic localization.
