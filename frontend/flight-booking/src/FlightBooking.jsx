import { useState,useEffect } from "react"
import Offer from "./Offer";
import { useNavigate } from "react-router-dom";


function FlightBooking(){
    const [olc,setOlc] = useState('');
    const [dlc,setDlc] = useState('');
    const [departureDate,setDepartureDate] = useState('');
    const [adults,setAdults] = useState('');
    const [nonstop,setNonstop] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const [flightData,setFlightData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (showOffer && flightData) {
        navigate("/booking", { state: { flightData } });
      }
    }, [showOffer, flightData, navigate]);


    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = {
            originLocationCode: olc,
            destinationLocationCode: dlc,
            departureDate,
            adults,
            nonStop: nonstop,
          };
        try{
            const response = await fetch("http://localhost:3000/flights", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (!response.ok){
                throw new Error('Network was not ok');
            }

            const data = await response.json();
            setFlightData(data);
            setShowOffer(true);
        } catch(error){
            console.error(`Error catching flights`,error);
        }

    };
    
    return (
          <form onSubmit={handleSubmit}>
              <div>
                <label>Origin Location Code
                <input type='text' value={olc} onChange={(e) => setOlc(e.target.value)}/>
                </label>
              </div>
              <div>
                <label>Departure Location Code
                <input type='text' value={dlc} onChange={(e) => setDlc(e.target.value)}/>
                </label> 
              </div>
              <div>
                <label>Departure Date
                <input type='text' value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}/>
                </label> 
              </div>
              <div>
                <label>adults
                <input type='text' value={adults} onChange={(e) => setAdults(e.target.value)}/>
                </label> 
              </div>
              <div>
                <label>NonStop
                </label>
                <label htmlFor="option1">
                  <input type="radio" id="option1" value={true} checked={nonstop === true} onChange={(e) => setNonstop(true)}/>
                </label>
                <label htmlFor="option2">
                  <input type="radio" id="option2" value={false} checked={nonstop === false} onChange={(e) => setNonstop(false)}/>
                </label>
              </div>
              <button type="submit">Check for Offers!</button>
          </form>
    ) 
}

export default FlightBooking