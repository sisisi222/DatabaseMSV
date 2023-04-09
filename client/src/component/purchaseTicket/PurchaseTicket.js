import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PurchaseTicket = () => {
  const location = useLocation();
  const flight = location.state.flight;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    price: flight.price,
    paymentType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the formData to the server to save in the database.
  };

  return (
    <div>
      <h3>Selected Flight</h3>
      <p>Flight ID: {flight.flightid}</p>
      <p>Origin: {flight.origin}</p>
      <p>Destination: {flight.destination}</p>
      <p>Departure Time: {flight.departuretime}</p>
      <p>Arrival Time: {flight.arrivaltime}</p>

      <form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="text" name="price" value={formData.price} readOnly />
        </label>
        <br />
        <label>
          Payment Type:
          <select name="paymentType" value={formData.paymentType} onChange={handleChange}>
            <option value="">Select payment type</option>
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>
        <br />
        <button type="submit">Purchase Ticket</button>
      </form>
    </div>
  );
};

export default PurchaseTicket;
