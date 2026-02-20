import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// ✅ REQUEST INTERCEPTOR — attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR — auto logout on 401
let isRedirecting = false;

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;

      // 🔥 clear session
      localStorage.removeItem("token");

      toast.error("Session expired. Please login again.");

      // small delay for toast visibility
      setTimeout(() => {
        window.location.href = "/auth";
        isRedirecting = false;
      }, 800);
    }

    return Promise.reject(error);
  }
);

export default API;
