const express = require('express');
const { checkAuth } = require('../controllers/authController');
const { createTicket, getUserTickets, getTicketById } = require('../controllers/ticketController');

const router = express.Router();

router.post('/', checkAuth, createTicket);
router.get('/', checkAuth, getUserTickets);
router.get('/:id', checkAuth, getTicketById);

module.exports = router;
