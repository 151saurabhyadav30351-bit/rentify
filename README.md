🚗 Rentify — Peer-to-Peer Car Rental Platform

Rentify is a production-ready full-stack MERN SaaS application that enables users to rent cars from local hosts while allowing vehicle owners to monetize their idle cars.

The platform is engineered with real-world booking safety, role-based access control, and scalable architecture, making it suitable for production-grade deployment and portfolio demonstration.

🌐 Live Demo

Frontend: https://rentify-ashen.vercel.app/

⚠️ Note: Backend may take ~20 seconds to wake up on first request (Render free tier cold start).

🎯 Project Highlights

✅ Production-ready MERN architecture

✅ Smart availability engine (no double bookings)

✅ Role-based platform (User / Host / Admin)

✅ Modern SaaS-level UI/UX

✅ Secure authentication & protected routes

✅ Scalable and modular code structure

✨ Core Features
🔐 Authentication & Security

JWT-based secure authentication

Protected routes (frontend + backend)

Persistent login session handling

Secure password hashing with bcrypt

Axios global interceptor for auth handling

Role-aware navigation rendering

🚗 Car Management System

Browse and search available cars

Advanced filtering (city, price, dates)

Host onboarding workflow

Add / Edit / Delete car listings

Image upload with Cloudinary

Featured cars showcase

Admin car moderation

📅 Smart Booking Engine (Production-Safe)

Real-time car availability checking

Date overlap prevention logic

MongoDB transaction-safe booking flow ⭐

Double-booking protection

Booking cancellation support

Host booking visibility dashboard

Admin booking monitoring

🛡️ Admin Control Panel

Platform analytics overview

User management

Car listing management

Booking monitoring

Support inbox management

Role-based navbar behavior

Secure admin route protection

💬 Support System

Public contact form

Admin support inbox

Message timestamp tracking

Secure backend validation

🧱 Tech Stack
🎨 Frontend

React (Vite)

Tailwind CSS (modern responsive UI)

React Router v6

Axios

Lucide React Icons

Context API (state management)

⚙️ Backend

Node.js

Express.js

MongoDB Atlas

Mongoose ODM

JWT Authentication

Bcrypt

Cloudinary (media storage)

☁️ Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Media Storage: Cloudinary


🏗️ System Architecture
User Browser
     ↓
React Frontend (Vercel)
     ↓
Express API (Render)
     ↓
MongoDB Atlas
     ↘
      Cloudinary (Image Storage)


🚀 Local Development Setup
1️⃣ Clone the Repository
git clone https://github.com/151saurabhyadav30351-bit/rentify.git


cd rentify
2️⃣ Install Dependencies
# Backend
npm install

# Frontend
cd client
npm install
3️⃣ Environment Variables

Create .env files in backend and client.

Backend .env (example)
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
Frontend .env
VITE_API_URL=http://localhost:5000

4️⃣ Run the Application
# Backend
npm start

# Frontend
cd client
npm run dev
📈 Production Readiness

Rentify includes several real-world hardening practices:

Backend validation layer

Defensive date conflict checking

Role-based access guards

Clean error boundaries

Lazy image loading

Skeleton loaders

Mobile-first responsive design

Environment-based configuration

🔮 Future Enhancements

⭐ Reviews & ratings system

💳 Stripe payment integration

🔔 Email & notification system

📱 React Native mobile app

📊 Advanced analytics dashboard

🤖 Smart pricing recommendations

👨‍💻 Author

Saurabh Yadav

MERN Stack Developer

Focused on building production-ready SaaS platforms

Interested in scalable system design & cybersecurity

⭐ Support

If you found this project valuable:

⭐ Star the repository

🍴 Fork the project

📢 Share with others