const Ticket = require('../models/ticketModel');

exports.createTicket = async (req, res) => {
  try {
    const { description, priority, category } = req.body;
    const ticket = {
      user: req.user.uid,
      description,
      priority,
      category,
      status: 'Open',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    };
    const newTicket = await Ticket.add(ticket);
    res.status(201).json({ id: newTicket.id, ...ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await Ticket.where('user', '==', userId).get();
    const tickets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticketDoc = await Ticket.doc(ticketId).get();
    if (!ticketDoc.exists) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.status(200).json({ id: ticketDoc.id, ...ticketDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
};
