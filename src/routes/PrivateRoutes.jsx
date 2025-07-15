import { useContext } from "react";
import { AuthContext } from "../context/authcontex";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const { user } = useContext(AuthContext);
  console.log("private routes", user);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
