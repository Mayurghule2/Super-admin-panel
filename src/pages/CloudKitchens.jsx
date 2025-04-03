import { useState,useEffect } from "react";
import CloudKitchenCard from "../components/CloudKitchenCard";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import kitchens from "../data/kitchensData";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";

import { Router, Routes, Route } from "react-router-dom";
const CloudKitchens = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedRevenue, setSelectedRevenue] = useState("");
const [kitchens, setKitchens] = useState([]);

  // Fetch Cloud Kitchens from API
 useEffect(() => {
  axios
    .get("http://localhost:9090/api/cloud-kitchens/all") // Call your API
    .then((response) => {
      setKitchens(response.data); // Store kitchens in state
      console.log(response.data)
    })
    .catch((error) => console.error("Error fetching kitchens:", error));
}, []);

// Handle state selection (reset city and rating)
const handleStateChange = (e) => {
  setSelectedState(e.target.value);
  setSelectedCity(""); // Reset city when state is changed
  setSelectedRating(""); // Reset rating when state is changed
  setSelectedRevenue("");
};
// Handle city selection (reset rating)
const handleCityChange = (e) => {
  setSelectedCity(e.target.value);
  setSelectedRating(""); // Reset rating when city is changed
  setSelectedRevenue("");
};
const handleRatingChange = (e) => {
  setSelectedRating(e.target.value);
  setSelectedRevenue("");
};
const handleRevenueChange = (e) => {
    setSelectedRevenue(e.target.value);
  };
 // Sorting logic
 const sortedKitchens = [...kitchens].sort((a, b) => {
  if (selectedRevenue === "asc") {
    return a.revenue - b.revenue;
  } else if (selectedRevenue === "desc") {
    return b.revenue - a.revenue;
  }
  return 0;
});
  // Filtering logic
  const filteredKitchens = kitchens.filter((kitchen) => {
    const stateMatch = selectedState === "" || kitchen.state === selectedState;
    const cityMatch = selectedCity === "" || kitchen.city === selectedCity;
    const ratingMatch = selectedRating === "" || kitchen.rating >= parseFloat(selectedRating);
    const searchMatch = searchTerm === "" || kitchen.name.toLowerCase().includes(searchTerm.toLowerCase());

    return stateMatch && cityMatch && ratingMatch && searchMatch;
  });

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedRating("");
    setSelectedRevenue("");
  };

  return (
   
      
    <div className="px-4 md:px-6 lg:px-8 max-w-5xl mt-16">
      <h1 className="text-xl md:text-3xl font-bold text-center my-4 mb-5">Cloud Kitchens Details</h1>

      <div className="my-4 flex flex-col gap-4 w-full">
      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {/* State Filter */}
        <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus-within:border-orange-500 focus-within:shadow-md">
          <select
            className="w-full appearance-none bg-transparent border-none outline-none text-gray-800 pr-6 pl-2"
            value={selectedState}
            onChange={handleStateChange}
            // onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
          </select>
          <FaChevronDown className="absolute right-3 text-gray-500 text-lg pointer-events-none" />
        </div>

        {/* City Filter */}
        <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus-within:border-orange-500 focus-within:shadow-md">
          <select
            className="w-full appearance-none bg-transparent border-none outline-none text-gray-800 pr-6 pl-2"
            value={selectedCity}
            // onChange={(e) => setSelectedCity(e.target.value)}
            onChange={handleCityChange}
          >
            <option value="">City</option>
            <option value="Amravati">Amravati</option>
            <option value="Pune">Pune</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Akola">Akola</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
          <FaChevronDown className="absolute right-3 text-gray-500 text-lg pointer-events-none" />
        </div>

        {/* Rating Filter */}
        <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus-within:border-orange-500 focus-within:shadow-md">
          <select
            className="w-full appearance-none bg-transparent border-none outline-none text-gray-800 pr-6 pl-2"
            value={selectedRating}
            // onChange={(e) => setSelectedRating(e.target.value)}
            onChange={handleRatingChange} 
          >
            <option value="">Rating</option>
            <option value="4.6">4.6 & Above</option>
            <option value="4.0">4.0 & Above</option>
            <option value="3.5">3.5 & Above</option>
            <option value="3">3 & Above</option>
          </select>
          <FaChevronDown className="absolute right-3 text-gray-500 text-lg pointer-events-none" />
        </div>
      <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 focus-within:border-orange-500 focus-within:shadow-md">
            <select
              className="w-full appearance-none bg-transparent border-none outline-none text-gray-800 pr-6 pl-2"
              value={selectedRevenue}
              // onChange={(e) => setSelectedRevenue(e.target.value)}
              onChange={handleRevenueChange}
            >
              <option value="">Revenue</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            <FaChevronDown className="absolute right-3 text-gray-500 text-lg pointer-events-none" />
          </div>
      </div>
      {/* Search and Clear Filters */}
      <div className="flex flex-wrap justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex items-center w-full sm:w-auto min-w-[180px] bg-white border border-gray-300  px-4 py-2 shadow-sm transition rounded-md focus-within:border-orange-500 focus-within:shadow-md justify-between">
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm bg-transparent border-none appearance-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
          />
          <FaSearch className="text-gray-500 text-md transition hover:scale-110 cursor-pointer" />
        </div>

        {/* Clear All Button */}
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2  text-red-500 px-6 py-2 rounded-md hover:bg-red-500 hover:text-white transition text-sm w-full sm:w-auto justify-center shadow-md font-bold"
        >
          Clear All <ImCross />
        </button>
      </div>
    </div>


      {/* Kitchens List */}
      <div className="grid gap-6">
        {filteredKitchens.length > 0 ? (
          filteredKitchens.map((kitchen) => (
            <CloudKitchenCard key={kitchen.id} kitchen={kitchen} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No kitchens match the selected filters.</p>
        )}
      </div>
    </div>
    
  );
};

export default CloudKitchens;
