import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const Search = ({setDest}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const selectRef = useRef(false);
    const dropdownRef = useRef(null);

    const fetchSuggestions = useCallback(async () => {
      if(!selectRef.current){
                if (query === '') {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/search', {
                params: { keyword: query }
            });
            console.log(response.data.data);
            setSuggestions(response.data.data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        setLoading(false);
      }
    }, [query]);

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchSuggestions();
        }, 300); // 300ms debounce

        return () => clearTimeout(debounceFetch);
    }, [query, fetchSuggestions]);

    const handleSelect = (suggestion) => {
      console.log(suggestion);
      setDest(suggestion.iataCode);
      setQuery(`${suggestion.iataCode}-${suggestion.address.cityName}`);
      setShowDropdown(false);
      selectRef.current = true;
    };

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

    return (
        <div className="autocomplete relative" ref={dropdownRef}>
            <input
                type="text"
                className="border border-gray-300 pl-1 pr-4 py-3 text-sm rounded-md"
                value={query}
                onClick={()=> selectRef.current = false}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter City, Airport"
                onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && suggestions.length>0 && (
                <ul className="shadow-sm px-2 py-2 border rounded-md w-64 overflow-hidden absolute bg-white z-10">
                    {suggestions.map((suggestion, index) => (
                        <li className="truncate cursor-pointer hover:bg-sky-600 px-4 py-1 border rounded-sm border-none" key={index} onClick={() => handleSelect(suggestion)}>
                            <span className="mr-2 text-sm">{suggestion.iataCode} - {suggestion.name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
