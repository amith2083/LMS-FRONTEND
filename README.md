# 🌱 Skillseed - AI-Powered Learning Management System

![Skillseed Banner](https://res.cloudinary.com/dynab60ke/image/upload/v1774808885/Screenshot_2026-03-29_234102_fciq3t.png)

**Skillseed** is a modern, feature-rich Learning Management System (LMS) built with the latest web technologies. It provides a seamless platform for instructors to create high-quality courses and students to master real-world skills through project-driven learning.

---

## 🚀 Features

### 🎓 For Students
- **Course Discovery**: Explore courses across various categories with a premium, responsive interface.
- **Interactive Learning**: High-quality video player with lesson tracking and progress persistence.
- **Quizzes & Assessments**: Test your knowledge with integrated quizzes at the end of modules.
- **Secure Enrollments**: One-click enrollment with secure Stripe payment processing.
- **AI Support**: Integrated AI chatbot to assist with course-related queries.

### 🛠️ For Instructors
- **Course Builder**: Powerful dashboard to manage course content, upload videos, and organize modules.
- **Analytics**: Track student enrollments, progress, and revenue insights.
- **Member Management**: Manage students enrolled in your courses.

### 🛡️ For Admins
- **Global Control**: Manage users, categories, and site-wide configurations.
- **Platform Analytics**: High-level overview of platform performance and growth.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript
- **Styling**: Tailwind CSS 4, Shadcn UI, Framer Motion
- **State Management**: TanStack Query v5
- **Forms**: React Hook Form, Zod
- **Authentication**: JWT & Google OAuth
- **Payments**: Stripe
- **Backend API**: Node.js & Express
- **Email**: Resend
- **Icons**: Lucide React, Tabler Icons

---

## 📂 Folder Structure

```text
lms/
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   ├── components/         # Shared UI components (Shadcn, MagicUI)
│   ├── features/           # Feature-based modular architecture
│   │   ├── auth/           # Login, Register, User Context
│   │   ├── courses/        # Course listing and landing pages
│   │   ├── lessons/        # Lesson content and logic
│   │   ├── watch/          # Video player and progress tracking
│   │   ├── quizzes/        # Quiz & Assessment components
│   │   └── admin/          # Admin-specific modules
│   ├── lib/                # Utility functions, API clients, and constants
│   ├── middleware.ts       # Auth & Route protection
│   └── styles/             # Global styles (Tailwind V4)
├── public/                 # Static assets (Images, SVGs)
└── .env.local              # Environment configurations
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/skillseed.git
cd skillseed/lms
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the `lms` root directory and add the following:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_id
```

### 4. Running the Project

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔐 Environment Variables Summary

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Client ID for Google Social Login |


---

## 🌐 API Endpoints (Frontend Hooks)

The project uses a structured backend. Primary data fetching is handled via custom hooks interacting with these endpoints:
- `AUTH`: `/api/auth/*`
- `COURSES`: `/api/courses/*`
- `ENROLLMENTS`: `/api/enrollments/*`
- `USER`: `/api/users/*`

---
## 📸 Screenshots

### 🎯 Hero Section
![Hero](https://res.cloudinary.com/dynab60ke/image/upload/v1774808885/Screenshot_2026-03-29_234102_fciq3t.png)

### 📚 Course Catalog
![Catalog](https://res.cloudinary.com/dynab60ke/image/upload/v1774808884/Screenshot_2026-03-29_234146_pa157v.png)

### 🎬 Video Player
![Player](https://res.cloudinary.com/dynab60ke/image/upload/v1774855300/Screenshot_2026-03-30_125031_liakyt.png)

### 📊 Admin Dashboard
![Dashboard](https://res.cloudinary.com/dynab60ke/image/upload/v1774856188/Screenshot_2026-03-30_130543_rfibfq.png)
---



## 🧠 Learnings & Challenges

- **Scalability**: Implementing a **feature-based architecture** significantly improved code maintainability as the project grew to 14+ distinct modules.
- **Performance**: Leveraging **Next.js 15 Partial Prerendering** and **TanStack Query** ensured ultra-fast page transitions and efficient data caching.
- **Complex UI**: Designing the "Argon Pro" aesthetic required deep integration of **Tailwind CSS 4** and **Framer Motion** for smooth, premium interactions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---


Made with ❤️ by [Amith k m]
