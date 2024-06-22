import { useState,useEffect } from "react"
import Offer from "../Offer";
import Search from "../components/Arrival";
import TravellersDropdown from "../Travellers";
import Nonstop from "../Nonstop";
import Navbar from "../Navbar";

function FlightBooking(){
    const [olc,setOlc] = useState('');
    const [dlc,setDlc] = useState('');
    const [departureDate,setDepartureDate] = useState('');
    const [adults,setAdults] = useState('');
    const [nonstop,setNonstop] = useState(false);
    const [showOffer, setShowOffer] = useState(false);
    const [flightData,setFlightData] = useState(null);

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
      <>
      <Navbar/>
      <form id="submit" className="flex flex-row space-x-4 p-6 pb-1" onSubmit={handleSubmit}>
      <Search setDest={setOlc}/>
      <Search setDest={setDlc}/>
      <div>
        <label htmlFor="date"></label>
        <input className="border border-gray-300 pl-1 pr-4 py-2 rounded-md h-12" name="date" type='date' value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}/>
      </div>
      <TravellersDropdown setTravellers={setAdults}/>
      <Nonstop setNonstop={setNonstop}/>
      <button form="submit" className="px-6 py-2 bg-gray-900 text-white border rounded-lg" type="submit">Search</button>
      </form>
      {showOffer && <Offer data={flightData}/>}
      </>
    ) 
}

export default FlightBooking