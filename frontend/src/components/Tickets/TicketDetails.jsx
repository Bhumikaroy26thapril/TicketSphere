import React, { useEffect, useState } from 'react';
import { db, firestore } from '../../services/firebase';
import { collection, doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
const TicketDetails = () => {
  const [ticket, setTicket] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        if (id) {
          // Create a reference to the specific document
          const ticketRef = doc(db, "tickets", id);
          // Fetch the document data
          const ticketDoc = await getDoc(ticketRef);
          if (ticketDoc.exists()) {
            setTicket(ticketDoc.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.log("Error fetching ticket details", error.message);
      }
    };
  
    fetchTicket();
  }, [id]);
  
  if (!ticket) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Ticket Details</h2>
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Description:</h3>
        <p className="text-gray-600">{ticket.description}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Status:</h3>
        <p className={`text-gray-600 ${ticket.status === 'Open' ? 'font-bold text-green-600' : 'font-bold text-red-600'}`}>
          {ticket.status}
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Priority:</h3>
        <p className="text-gray-600">{ticket.priority}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-2">Category:</h3>
        <p className="text-gray-600">{ticket.category}</p>
      </div>
      <button
        onClick={() => navigate("/tickets")}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go Back
      </button>
    </div>
  </div>
  
  );
};

export default TicketDetails;
