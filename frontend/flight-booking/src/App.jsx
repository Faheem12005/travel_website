import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import FlightBooking from './FlightBooking';
import { AuthContext } from './AuthContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <h1 className='text-yellow-500 text-9xl'>NIGGER</h1>
      <Routes>
        {/* Route for Login component */}
        <Route path="/login" element={
            isLoggedIn ? <Navigate to="/flightbooking" /> : <Login/>
          } />

        {/* PrivateRoute for FlightBooking component */}
        <Route
          path="/flightbooking"
          element={
            isLoggedIn ? <FlightBooking /> : <Navigate to="/login" />
          }
        />

        {/* Default redirect to FlightBooking if no specific route matches */}
        <Route path="/" element={<Navigate to="/flightbooking" />} />
      </Routes>
    </Router>
  );
}

export default App;
