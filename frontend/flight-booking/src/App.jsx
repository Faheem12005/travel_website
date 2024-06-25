import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'
import FlightBooking from './pages/FlightBooking';
import { AuthContext } from './components/AuthContext';
import FlightOffer from './pages/FlightOffer';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
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

        <Route
          path="/offer/:id"
          element={
            isLoggedIn ? <FlightOffer/> : <Navigate to="/login"/>
          }
        />

        {/* Default redirect to FlightBooking if no specific route matches */}
        <Route path="/" element={<Navigate to="/flightbooking" />} />
      </Routes>
    </Router>
  );
}

export default App;
