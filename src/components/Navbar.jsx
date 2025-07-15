import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authcontex";
import "../App.css"

export function Navbar() {
  let { user } = useContext(AuthContext);
  console.log(user);

  return (
    <>
      <div className="navbar">
        <NavLink to="/">Home</NavLink>
        {user?.role === "admin" ? (
          <>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/topics">Topic</NavLink>
          </>
        ) : user?.role === "user" ? (
          <>
            <NavLink to="/questions">Questions</NavLink>
            <NavLink to="quizes">Quize</NavLink>
          </>
        ) : null}
        {user ? (
          <NavLink to="/profile">Profile</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </>
  );
}
