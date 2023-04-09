const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

router.post('/purchaseTicket', async (req, res) => {
  const { bookingId, seatNum, price, purchaseMethod, ticketType, purchaser, flightId } = req.body;

  try {
    const query = `INSERT INTO public.ticket (bookingid, seatnum, price, purchasemethod, tickettype, purchaser, flightid)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [bookingId, seatNum, price, purchaseMethod, ticketType, purchaser, flightId];

    await pool.query(query, values);

    res.status(200).json({ message: 'Ticket purchased successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while purchasing the ticket.' });
  }
});

module.exports = router;
