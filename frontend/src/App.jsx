import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TicketForm from "./components/Tickets/TicketForm";
import TicketList from "./components/Tickets/TicketList";
import TicketDetails from "./components/Tickets/TicketDetails";
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/ticket/new" element={<TicketForm />} />
            <Route path="/ticket/:id" element={<TicketDetails />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
