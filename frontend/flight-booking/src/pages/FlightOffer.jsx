import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function FlightOffer() {
    const location = useLocation();
    const { offer } = location.state; // Destructure offer from location.state
    const [flightData, setFlightData] = useState(null); // State to store flight data

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.post('/api/flights/offer-price', { offer }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                setFlightData(response.data); // Store fetched data in state
            } catch (error) {
                console.error('Error fetching flight data:', error);
                // Handle error state or display error message
            }
        };

        fetchFlightData(); // Call the async function to fetch flight data
    }, [offer]); // Dependency array includes offer to trigger fetch on offer change
    
    // Render your component based on offer and flightData
    return (
        <div>

        </div>
    );
}

export default FlightOffer;
