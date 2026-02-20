import { createContext, useContext, useEffect, useState, useCallback } from "react";
import API from "./api";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ reactive token state (CRITICAL FIX)
  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
  );

  // ================= FETCH USER =================
  const fetchUser = useCallback(async () => {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      setUser(null);
      return;
    }

    try {
      const res = await API.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      setUser(res.data);
    } catch {
      setUser(null);
    }
  }, []);

  // ================= WATCH TOKEN =================
  useEffect(() => {
    fetchUser();
  }, [token, fetchUser]);

  // ================= LOGIN HELPER =================
  const loginUser = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // ⭐ forces refresh everywhere
    await fetchUser();
  };

  // ================= LOGOUT HELPER =================
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        loginUser,   // ⭐ NEW
        logoutUser,  // ⭐ NEW
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);