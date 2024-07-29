import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { db, firestore } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (currentUser) {
          // Create a query for the 'tickets' collection
          const ticketsRef = collection(db, "tickets");
          const q = query(ticketsRef, where("user", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);
          // Map through the documents and set ticket data
          const ticketsData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTickets(ticketsData);
        }
      } catch (error) {
        console.log("Error fetching tickets", error.message);
      }
    };

    fetchTickets();
  }, [currentUser]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
    <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
      Your Tickets
    </h2>
    {tickets.length > 0 ? (
      tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white p-6 mb-4 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {ticket.description}
          </h3>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Status:</span> {ticket.status}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Priority:</span> {ticket.priority}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-medium">Category:</span> {ticket.category}
          </p>
          <button
            onClick={() => navigate(`/ticket/${ticket.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Read More
          </button>
        </div>
      ))
    ) : (
      <p className="text-gray-600 text-center">No tickets available.</p>
    )}
  </div>
  );
};

export default TicketList;
