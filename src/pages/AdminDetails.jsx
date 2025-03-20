import React, { useState } from "react";
import { FaDownload, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

import { ImCross } from "react-icons/im";
const AdminDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const managers = [
    { id: 1, name: "MS Dhoni", kitchen: "Biryani House", city: "Amravati", state: "Maharashtra", status: "Active" },
    { id: 2, name: "Rohit Sharma", kitchen: "Taste of South", city: "Mysuru", state: "Karnataka", status: "Inactive" },
    { id: 3, name: "Virat Kohli", kitchen: "Khamaas Veg", city: "Delhi", state: "Delhi", status: "Active" },
    { id: 4, name: "Suresh Raina", kitchen: "Tandoori House", city: "Lucknow", state: "Uttar Pradesh", status: "Active" },
    { id: 5, name: "Jasprit Bumrah", kitchen: "Punjabi Tadka", city: "Amritsar", state: "Punjab", status: "Active" },
  ];

  // *Updated Filtering Logic*
  const filteredManagers = managers.filter((manager) => {
    return (
      (searchTerm === "" || manager.name.toLowerCase().includes(searchTerm.toLowerCase()) || manager.kitchen.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterState === "" || manager.state === filterState) &&
      (filterCity === "" || manager.city === filterCity) &&
      (filterStatus === "" || manager.status === filterStatus)
    );
  });

  const handleDownload = () => {
    const headers = ["ID,Name,Cloud Kitchen,City,State,Status"];
    const data = managers.map(manager =>
      `${manager.id},${manager.name},${manager.kitchen},${manager.city},${manager.state},${manager.status}`
    );
    const csvContent = [headers, ...data].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AdminDetails.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterState("");
    setFilterCity("");
    setFilterStatus("");
  };
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/update-manager/${managers.id}`)
  }

  //total manager count and count of cloud kitchen
  const totalManagers = managers.length;
  const totalCloudKitchens = new Set(managers.map((manager) => manager.kitchen)).size;


  return (
    <div className="mt-16 bg-gray-100 max-w-6xl">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Admin Details</h2>
      {/* Stats Section */}
      <div className="flex gap-6 mb-6 mx-auto w-3/4 justify-center">
        <div className="bg-orange-500 text-white p-6 rounded-lg w-1/2 shadow-md flex justify-between items-center">
          <span className="font-semibold text-lg">Total Managers</span>
          <span className="text-2xl font-bold">{totalManagers}</span>
        </div>
        <div className="bg-orange-500 text-white p-6 rounded-lg w-1/2 shadow-md flex justify-between items-center">
          <span className="font-semibold text-lg">Total Cloud Kitchens</span>
          <span className="text-2xl font-bold">{totalCloudKitchens}</span>
        </div>
      </div>
      <div className="flex gap-4 mb-6 mx-auto w-3/4 justify-between">
        <div className="w-96">

          <input
            type="text"
            placeholder="Search Cloud kitchen or Manager..."
            className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <button
            className="mt-auto bg-green-600 hover:bg-green-700 text-white rounded-lg px-5 py-3 shadow-md flex items-center gap-2 transition-all duration-200 justify-center font-bold"
            onClick={handleDownload}
          >
            <FaDownload /> Download List
          </button>

        </div>
      </div>


      <div className="flex gap-4 mb-6 mx-auto w-3/4 flex-col lg:flex-row">
        <div className="relative w-80">
          <select className="w-full p-3 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}>
            <option value="">State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Punjab">Punjab</option>
          </select>
          <FaChevronDown className="absolute top-1/2 right-3 w-5 h-5 text-gray-600 transform -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="relative w-80">
          <select
            className="w-full p-3 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          >
            <option value="">City</option>
            <option value="Amravati">Amravati</option>
            <option value="Mysuru">Mysuru</option>
            <option value="Delhi">Delhi</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Amritsar">Amritsar</option>
          </select>
          <FaChevronDown className="absolute top-1/2 right-3 w-5 h-5 text-gray-600 transform -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="relative w-80">

          <select className="w-full p-3 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <FaChevronDown className="absolute top-1/2 right-3 w-5 h-5 text-gray-600 transform -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow-md mt-auto flex items-center justify-center gap-2 w-80 font-bold"
          onClick={handleClearFilters}>
          Clear All
          <span className="font-bold ">

            <ImCross />
          </span>
        </button>

      </div>

      <div className="mx-auto w-3/4 bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Cloud Kitchen</th>
              <th className="border p-3">City</th>
              <th className="border p-3">State</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredManagers.map((manager) => (
              <tr key={manager.id} className="text-center hover:bg-gray-100 transition-all">
                <td className="border p-3">{manager.id}</td>
                <td className="border p-3 font-medium">
                  <Link to={`/manager-details/${manager.name}`} className="text-blue-600 hover:underline">
                    {manager.name}
                  </Link>
                </td>
                <td className="border p-3">{manager.kitchen}</td>
                <td className="border p-3">{manager.city}</td>
                <td className="border p-3">{manager.state}</td>
                <td className={`border p-3 font-semibold ${manager.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {manager.status}
                </td>
                <td className="border p-3">
                  <button className="text-blue-600 hover:text-blue-800" onClick={handleEditClick}>
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminDetails;