# 🏫 Gaushala Public School (GPS) — Official Web Portal

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, responsive web application for **Gaushala Public School**, featuring an integrated **AI School Assistant** powered by Google Gemini to answer questions from parents and students in real-time.

---

## ✨ Features

- **🎓 Comprehensive School Information:**
  - **About Us:** School vision, mission, milestone history (2010–2022), and Principal's message.
  - **Academics:** Grade-by-grade curriculum overview from Nursery to Class 5, experiential learning methodologies, and extracurricular activities.
  - **Admissions:** Transparent four-step admission procedure, age eligibility, downloadable admission form, and clear fee breakdown table.
  - **Gallery & Events:** Visual showcase of school events, activities, and campus updates.
  - **Contact Us:** Direct parent contact form, school phone number, email address, and embedded location map.

- **🤖 Intelligent AI School Assistant:**
  - Embedded floating assistant powered by **Google Gemini 2.5 Flash**.
  - Grounded in Gaushala Public School data (timings, fee structures, admissions, curriculum).
  - One-tap quick question chips (*Fee Structure 💰*, *Admission Process 📋*, *School Timings ⏰*, *Contact Info 📞*).
  - Multi-turn conversation memory with animated typing indicators and instant answers.

- **🎨 Modern Design & UI/UX:**
  - Fluid responsive layouts across desktop, tablet, and mobile.
  - Smooth page transitions and subtle micro-animations powered by **Framer Motion**.
  - Accessible typography and cohesive color palette built with **Tailwind CSS**.

---

## 🛠️ Tech Stack

- **Frontend Library:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Heroicons](https://heroicons.com/) & [React Icons](https://react-icons.github.io/react-icons/)
- **AI Backend / API:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/rautrajukumar/GPS-School.git
cd GPS-School
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get your free API key at [Google AI Studio](https://aistudio.google.com/)).*

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory.

---

## 📁 Project Structure

```text
GPS-School/
├── public/                # Static assets, logos, and favicon
├── src/
│   ├── assets/            # Images (hero, school activities, faculty)
│   ├── components/        # Reusable components (Navbar, Footer, Chatbot)
│   ├── pages/             # Pages (Home, About, Academics, Admissions, Gallery, EventsNews, Contact)
│   ├── App.jsx            # Routing and global layout
│   ├── index.css          # Global styling and Tailwind directives
│   └── main.jsx           # Application entry point
├── api/                   # Serverless function handlers
├── functions/             # Firebase Cloud Functions (optional deployment)
├── preview/               # Demo videos and client preview assets
├── .env.example           # Environment variable template
└── package.json           # Dependencies and scripts
```

---

## 📄 License

This project is licensed under the MIT License.
