import React from "react";

function Offer({data}) {
    const formatDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
        const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Flight Offers</h1>
            {
                data.data.map((offer, index) => (
                    <div key={index} className="bg-white shadow-sm rounded-lg p-6 mb-6 max-w-5xl min-w-fit border">
                        <div className="grid sm:grid-cols-3 grid-cols-1">
                            {/* Grid column 1: Flight details */}
                            <div className="col-span-1">
                                <div className="flex items-center space-x-2">
                                    {offer.itineraries[0].segments.map((flights, flightIndex) => (
                                        <React.Fragment key={`${index}-${flightIndex}`}>
                                            {/* Show departure code of the first segment and arrival codes of subsequent segments */}
                                            {flightIndex === 0 && (
                                                <div className="text-lg font-semibold">{flights.departure.iataCode}</div>
                                            )}
                                            <svg className="w-4 h-4 text-gray-500 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                            <div className="text-lg font-semibold">{flights.arrival.iataCode}</div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            {/* Grid column 2: Duration */}
                            <div className="col-span-1 flex items-center justify-center">
                                <div className="text-lg font-semibold">{formatDuration(offer.itineraries[0].duration)}</div>
                            </div>
                            {/* Grid column 3: Price */}
                            <div className="col-span-1 flex items-center justify-end mt-2">
                                <span className="text-indigo-600">€{offer.price.total}</span>
                                {/* {offer.price.currency} */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Offer;
