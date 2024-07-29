import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../services/firebase";
const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.logg("Error logging out", error.message);
    }
  };

  return (
    <nav className="p-4 bg-blue-600 text-white">
      <ul className="flex justify-between flex-row">
            <li>
              <Link to="/">Home</Link>
            </li>
        {currentUser ? (
          <>
            <li>
              <Link to="/ticket/new">Add Ticket</Link>
            </li>
            <li>
              <Link to="/tickets">My Tickets</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
