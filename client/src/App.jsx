import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AppRoutes from "./routes"
import Auth from "./pages/Auth"
import Host from "./pages/Host"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

export default function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  )
}
