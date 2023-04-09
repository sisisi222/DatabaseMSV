import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      origin.toLowerCase();
      destination.toLowerCase();
      const response = await axios.get(`http://localhost:4000/search?origin=${origin}&destination=${destination}`);
      console.log(response.data.rows);
      setFlights(response.data.rows);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleNewSearch = () => {
    setOrigin('');
    setDestination('');
    setFlights([]);
  };

  const handleSelectFlight = (flight) => {
    navigate('/purchaseTicket', { state: { flight } });
  };

  return (
    <div>
      <h2>Search for Flights</h2>
      <form onSubmit={handleSearch}>
        <label>
          Origin:
          <input type="text" value={origin} onChange={(event) => setOrigin(event.target.value)} />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={(event) => setDestination(event.target.value)} />
        </label>
        <br />
        <button type="submit">Search</button>
      </form>
      <div>
        {flights.map((flight) => (
          <div key={flight.flightid}>
            <h3>Flight ID: {flight.flightid}</h3>
            <p>Origin: {flight.origin}</p>
            <p>Destination: {flight.destination}</p>
            <p>Departure Time: {flight.departuretime}</p>
            <p>Arrival Time: {flight.arrivaltime}</p>
            <p>Number of Passengers: {flight.numberpassengers}</p>
            <p>Flight Status: {flight.flightstatus}</p>
            <button onClick={() => handleSelectFlight(flight)}>Select</button>
          </div>
        ))}
        {flights.length > 0 && <button onClick={handleNewSearch}>New Search</button>} {/* Add this line */}
      </div>
    </div>
  );
}

export default Search;
