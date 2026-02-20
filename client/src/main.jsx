import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { BookingProvider } from "./BookingContext"
import "./index.css"
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./UserContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BookingProvider>
      <UserProvider>
      <App />
      <Toaster position="top-right" />
      <ScrollToTop />
      </UserProvider>
    </BookingProvider>
  </BrowserRouter>
)
