import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("https://quize-app-es62.onrender.com/Users/login", {
        email,
        password,
      });
      
      if (res.data.accesstoken) {
        setUser({ email, role: res.data?.role});
        setAccessToken(res.data.accesstoken);
        setRefreshToken(res.data.refreshtoken);
        localStorage.setItem("accessToken", res.data.accesstoken);
        localStorage.setItem("refreshToken", res.data.refreshtoken);
      }
    } catch (e) {
      console.error("Login failed", e);
    }
  };

const register = async ({ email, password }) => {
  try {
    const res = await axios.post("https://quize-app-es62.onrender.com/Users/signup", { email, password });
   
    return res.data; 
  } catch (e) {
  

    if (e.response?.status === 400) {
      return { message: "User already registered" }; 
    }

    return { message: "Server error, please try again later" }; 
  }
};

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.clear();
  };


  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

