import React from "react";
import { format, differenceInMinutes } from 'date-fns';
import WaitIcon from "../../public/wait";
import { useNavigate } from "react-router-dom";

function Offer({data}) {
    const navigate = useNavigate();

    console.log(data.data[0]);
    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
        const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
        return `${hours}h ${minutes}m`;
    };


    const formatDeparture = (time) => {
        const string = time.split('T')[1].slice(0,5);
        return string;
    }

    const formatArrival = (arrival,departure) => {
        const ar = parseInt(arrival.split('T')[0].slice(8,10));
        const dp = parseInt(departure.split('T')[0].slice(8,10));
        if (!ar>dp){ return(arrival.split('T')[1].slice(0,5)) }
        else if (ar-dp == 1){
            return(
                <div>{arrival.split('T')[1].slice(0,5)}<span className="text-gray-400 font text-sm font-extralight">+1D</span></div>)
        }
        else if (ar-dp == 2){
            return(
                <div>{arrival.split('T')[1].slice(0,5)}<span className="text-gray-400 font text-sm font-extralight">+2D</span></div>)
        }
        else if (ar-dp == 3){
            return(
                <div>{arrival.split('T')[1].slice(0,5)}<span className="text-gray-400 font text-sm font-extralight">+3D</span></div>)
        }
        else{
            return(<div>{arrival.split('T')[1].slice(0,5)}</div>)
        }
    }

    const calculateLayover = (layover,arrival, departure) => {
        const arrivalTime = new Date(arrival);
        const departureTime = new Date(departure);
        const diffMinutes = differenceInMinutes(departureTime, arrivalTime);
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        if (hours>4) {
            return(
                <div className="flex flex-col items-center justify-center group">
                    <WaitIcon width={25} height={25}></WaitIcon>
                    <div className="opacity-0 flex flex-col items-center group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-xs">{hours}h {minutes}m</div>
                        <div className="text-xs">{layover}</div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="flex flex-col items-center justify-center group">
                    <svg id="Icons_Run" className={""} overflow="hidden" version="1.1" width="25" height='25' viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle className="fill-current" cx="64.2" cy="13" r="8"/><path className="fill-current" d=" M 83.6 24 C 81.6 23 79.2 23.7 78.2 25.7 L 74.7 32.3 L 59.3 22.6 C 58.7 22.2 58 22 57.2 22 L 40.2 22 C 38.7 22 37.4 22.8 36.7 24.1 L 30.2 36.1 C 29.1 38 29.9 40.5 31.8 41.5 C 32.4 41.8 33.1 42 33.7 42 C 35.1 42 36.5 41.2 37.2 39.9 L 42.6 30 L 48.5 30 L 30.8 63 L 14.2 63 C 12 63 10.2 64.8 10.2 67 C 10.2 69.2 12 71 14.2 71 L 33.2 71 C 34.7 71 36 70.2 36.7 68.9 L 43.7 56 L 55.2 66.7 L 54.3 86.8 C 54.1 89 55.8 90.9 58 91 C 58.1 91 58.1 91 58.2 91 C 60.3 91 62.1 89.3 62.2 87.2 L 63.2 65.2 C 63.3 64 62.8 62.9 61.9 62.1 L 52.2 53.1 L 62.4 34.1 L 74 41.4 C 74.9 42 76.1 42.2 77.2 41.9 C 78.3 41.6 79.2 40.9 79.7 39.9 L 85.2 29.4 C 86.3 27.5 85.6 25.1 83.6 24 Z"/></g></svg>
                    <div className="opacity-0 flex flex-col items-center group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-xs">{hours}h {minutes}m</div>
                        <div className="text-xs">{layover}</div>
                    </div>
                </div>
            )
        }
    };

    const handleBookClick = (offer) => {
        console.log(`Offer being passed as state ${offer}`);
        navigate(`/offer/${offer.id}`, { state: { offer } });
    };


    return (
        <div className="container p-6 flex flex-col justify-center items-center">
            {
                data.data.map((offer, index) => (
                    <div key={index} className="bg-white shadow-sm rounded-lg px-6 py-3 mb-6 h-32 w-8/12 border">
                        <div className="grid sm:grid-cols-3 grid-cols-1">
                            {/* Grid column 1: Flight details */}
                            <div className="col-span-1 flex justify-self-start items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="text-lg font-semibold">{offer.itineraries[0].segments[0].departure.iataCode}</div>
                                    <svg className="w-4 h-4 text-gray-500 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                    <div className="text-lg font-semibold">{offer.itineraries[0].segments[offer.itineraries[0].segments.length-1].arrival.iataCode}</div>
                                </div>
                            </div>
                            {/* Grid column 2: Duration */}
                            <div className="col-span-1">
                                <div className="flex items-center justify-center">
                                    <div className="mr-4 text-xl font-semibold">{formatDeparture(offer.itineraries[0].segments[0].departure.at)}</div>
                                    <div className="flex justify-center items-center flex-col text-gray-500">
                                        <p className="text-sm">Duration</p>
                                        <svg
                                            className="h-px w-16 mx-auto mt-2" // Adjust height, width, and margins as needed
                                            viewBox="0 0 100 1"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <rect width="100" height="1" rx="0.5" />
                                        </svg>
                                        <div className="text-lg">{formatDuration(offer.itineraries[0].duration)}</div>
                                        <div className="flex flex-row">
                                            {offer.itineraries[0].segments.map((flights, flightIndex) => (
                                                <React.Fragment key={`${index}-${flightIndex}`}>
                                                    {flightIndex >0 && (
                                                        <div>{calculateLayover(flights.departure.iataCode,offer.itineraries[0].segments[flightIndex-1].arrival.at,offer.itineraries[0].segments[flightIndex].departure.at)}</div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="ml-4 text-xl font-semibold">{formatArrival(offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at,offer.itineraries[0].segments[0].departure.at)}</div>
                                </div>
                            </div>
                            {/* Grid column 3: Price */}
                            <div className="col-span-1 flex items-center justify-end mt-2 space-x-5">
                                <span className="text-xl font-bold">€{offer.price.total}</span>
                                {/* {offer.price.currency} */}
                                <button className="px-14 py-4 bg-amber-500 rounded-xl text-white font-bold hover:bg-amber-600" onClick={() => {handleBookClick(offer)}}>Book</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Offer;
