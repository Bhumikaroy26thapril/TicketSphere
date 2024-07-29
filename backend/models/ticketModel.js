const admin = require('firebase-admin');
const db = admin.firestore();

const Ticket = db.collection('tickets');

module.exports = Ticket;
