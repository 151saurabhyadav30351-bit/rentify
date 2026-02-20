# 🚗 Rentify — Peer-to-Peer Car Rental Platform

Rentify is a production-ready full-stack MERN application that enables users to rent cars from local hosts while allowing car owners to earn by listing their vehicles. The platform focuses on real-world booking safety, clean UX, and scalable architecture.

---

## 🌐 Live Demo

* **Frontend:** https://rentify-ashen.vercel.app/
* **Backend API:** https://rentify-backend-uzth.onrender.com

> ⚠️ Note: Backend may take ~20 seconds to wake up on first request (Render free tier).

---

## ✨ Key Features

### 🔐 Authentication & Security

* JWT-based authentication
* Protected routes (frontend + backend)
* Auto session expiry handling
* Secure password hashing (bcrypt)

### 🚗 Car Management

* Browse available cars
* Host onboarding flow
* Add, edit, delete cars
* Featured cars section
* Advanced filtering UI

### 📅 Smart Booking Engine

* Real-time car booking
* Overlap prevention logic
* **Race-condition safe bookings (Mongo transactions)** ⭐
* Booking cancellation
* Host booking dashboard

### 🛡️ Production Hardening

* Backend validation layer
* Role-ready host system
* Global Axios interceptor
* Clean error handling
* Environment-based configuration

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Lucide Icons
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cloudinary (image storage)

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗️ System Architecture

User → React Frontend → Express API → MongoDB Atlas
↘ Cloudinary (image storage)

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/151saurabhyadav30351-bit/rentify.git
cd rentify
```

### 2️⃣ Install dependencies

```bash
# backend
npm install

# frontend
cd client
npm install
```

### 3️⃣ Configure environment variables

Create `.env` files in both backend and client with required keys.

### 4️⃣ Run the project

```bash
# backend
npm start

# frontend
cd client
npm run dev
```

---

## 🔮 Future Enhancements

* ⭐ Reviews & ratings system
* 💳 Stripe payment integration
* 🛠️ Admin dashboard
* 🔔 Email notifications
* 📱 Mobile app version

---

## 👨‍💻 Author

**Saurabh Yadav**

If you found this project useful, consider giving it a ⭐ on GitHub!
