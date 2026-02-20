import { createContext, useState } from "react";
import API from "./api";
import toast from "react-hot-toast";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  async function addBooking(payload) {
    try {
      const token = localStorage.getItem("token");

      await API.post("/api/bookings", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Booking successful 🚗");
      fetchBookings();

    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  }

  async function fetchBookings() {
    const token = localStorage.getItem("token");

    const res = await API.get("/api/bookings/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBookings(res.data);
  }

  async function cancelBooking(id) {
    const token = localStorage.getItem("token");

    await API.delete(`/api/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Booking cancelled");
    fetchBookings();
  }

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, fetchBookings, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}
