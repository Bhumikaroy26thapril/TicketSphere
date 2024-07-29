import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db, firestore } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const TicketForm = () => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('General');
  const navigate = useNavigate()
  const { currentUser } = useAuth();
  useEffect(() => {
    if (!currentUser) {
     return navigate("/login");
    }
  }, [currentUser, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a reference to the 'tickets' collection
      const ticketsCollectionRef = collection(db, 'tickets');
      // Add a new document to the 'tickets' collection
     const e = await addDoc(ticketsCollectionRef, {
        user: currentUser.uid,
        description,
        priority,
        category,
        status: 'Open',
        created_at: new Date(),
      });
      // Clear form fields or show success message here if needed
      setDescription('');
      setPriority('Low');
      setCategory('General');
    } catch (error) {
      console.log('Error creating ticket', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        placeholder="Issue Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="General">General</option>
        <option value="Technical">Technical</option>
        <option value="Billing">Billing</option>
      </select>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Ticket
      </button>
    </form>
  );
};

export default TicketForm;
