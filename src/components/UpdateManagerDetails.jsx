import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdateManagerDetails = () => {
  const { id } = useParams(); // Get manager ID from URL
  const location = useLocation(); // Get passed data
  const navigate = useNavigate(); // To navigate after closing modal

  // Get manager details or set defaults
  const manager = location.state || {};

  // State for form inputs
  const [formData, setFormData] = useState({
    name: manager.name || "Manager Name",
    kitchen: manager.kitchen || "",
    email: manager.email || "",
    cloudKitchenId: manager.cloudKitchenId || "",
    phone: manager.phone || "",
    status: manager.status || "Active",
  });
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/managers/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Manager updated successfully!");
        navigate(-1); // Go back to previous page
      } else {
        alert("Failed to update manager");
      }
    } catch (error) {
      console.error("Error updating manager:", error);
    }
  };
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle radio button change
  const handleRadioChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };

  // Close modal function
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white pl-6 pr-6 pb-6 rounded-lg shadow-xl w-[600px] max-w-full relative">
        {/* Close Button */}
        <button className="text-end mt-auto text-gray-500 text-2xl hover:text-gray-700" onClick={handleClose}>
          &times;
        </button>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-5 mb-5">
          <img className="w-20 h-20 rounded-full" src="/images/profile.jpg" alt="Manager Profile" />
          <h1 className="text-xl font-bold mt-2">{formData.name}</h1>
        </div>

        <div className="mt-4">
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1">Cloud Kitchen Name</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                type="text"
                name="kitchen"
                value={formData.kitchen}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1">Email ID</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1">Cloud Kitchen ID</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                type="text"
                name="cloudKitchenId"
                value={formData.cloudKitchenId}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1">Phone Number</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="font-semibold text-gray-700">Status</label>
            <div className="flex flex-col space-y-2 mt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleRadioChange}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
        ${formData.status === 'Active' ? 'border-orange-500' : 'border-gray-400'}`}>
                  {formData.status === 'Active' && (
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-800 font-medium">Active</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleRadioChange}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center 
        ${formData.status === 'Inactive' ? 'border-orange-500' : 'border-gray-400'}`}>
                  {formData.status === 'Inactive' && (
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-gray-800 font-medium">Inactive</span>
              </label>
            </div>
          </div>

          {/* Update Button */}
          <div className="text-center">

            <button className="w-1/4 bg-orange-500 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-orange-600" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateManagerDetails;
