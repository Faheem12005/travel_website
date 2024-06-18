import { useLocation } from "react-router-dom";

function Offer(){
    const location = useLocation();
    const props = location.state.flightData;
    console.log(props);
    const data = props.data;
    console.log(data[0].price.total);
    return(
        <div>
            <h1>Flight Offers</h1>
            {
                data.map((offer,index) => (
                    <div key={index} className="offer">
                        <p>{index+1}</p>
                        { offer.itineraries[0].segments.map((flights,flightIndex) => (
                            <div key={`${index}-${flightIndex}`}>
                                <div>Departure: {flights.departure.iataCode}</div>
                                <div>Arrival: {flights.arrival.iataCode}</div>
                            </div>
                        ))}
                        <p>Grand Total: {offer.price.currency}{offer.price.total}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Offer