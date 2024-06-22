import { useEffect, useState,useRef } from "react";

const TravellersDropdown = ({setTravellers}) => {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };
  
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
  
    const totalTravellers = adults + children;
    useEffect(()=> {
        setTravellers(totalTravellers);
    },[adults,children])
  
    return (
      <div className="text-left relative">
        <div>
          <button
            type="button"
            className="border border-gray-300 pl-1 pr-4 py-3 text-sm rounded-md hover:bg-gray-50 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Travelers: {totalTravellers}
          </button>
        </div>
        {showDropdown && (
          <div ref={dropdownRef} className="absolute mt-2 w-56 rounded-md shadow-md">
            <div className="py-1 bg-white rounded-md">
              <div className="flex justify-between items-center px-4 py-2">
                <span className="text-sm">Adults</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-gray-600"
                    onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}
                  >-</button>
                  <span className="px-4">{adults}</span>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-gray-600"
                    onClick={() => setAdults(adults + 1)}
                  >+</button>
                </div>
              </div>
              <div className="flex justify-between items-center px-4 py-2">
                <span className="text-sm">Children</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-gray-600"
                    onClick={() => setChildren(children > 0 ? children - 1 : 0)}
                  >-</button>
                  <span className="px-4">{children}</span>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm text-gray-600"
                    onClick={() => setChildren(children + 1)}
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default TravellersDropdown