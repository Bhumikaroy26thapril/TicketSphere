import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-semibold mb-4 text-gray-800">Welcome!</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the Ticket Management System. Manage your tickets easily and efficiently.
        </p>
        <button
          onClick={() => navigate("/tickets")}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View Your Tickets
        </button>
      </div>
    </div>
  );
};

export default Home;
