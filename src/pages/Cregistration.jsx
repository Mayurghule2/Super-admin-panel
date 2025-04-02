import React, { useState, useRef } from "react";
import { FaKitchenSet } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { TbMapPinCode } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CloudRegistration = () => {
  const navigate = useNavigate();
  const initialFormState = {
    kitchenName: "",
    managerName: "",
    phoneNumber: "",
    createdAt: "",
    location: "",
    region: "",
    city: "",
    postalCode: "",
    state: "",
    cuisineType: "",
    kitchenType: "",
    hygieneRating: "",
    googleMapsLocation: "",
    gstNumber: "",
    paymentMethods: [],
    operatingTime: { open: "", close: "" }, // Ensure this structure
    fssaiDoc: null,
    necessaryDocuments: null,
    country: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const fromTimeRef = useRef(null);
  const toTimeRef = useRef(null);
  const fssaiLicenseDocumentRef = useRef(null);
  const necessaryDocumentsRef = useRef(null);
  const kitchenId = 1;

  const [successMessage, setSuccessMessage] = useState("");


  const handlePaymentMethodChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      paymentMethods: checked
        ? [...prevData.paymentMethods, value] // Add method
        : prevData.paymentMethods.filter((method) => method !== value) // Remove method
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    console.log("Submitting data:", formData); // ✅ Debugging line

    if (!formData.kitchenName || formData.kitchenName.trim() === "") {
      console.error("Error: kitchenName is missing!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:9090/api/cloud-kitchens/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      alert("Response:", "Cloud Kitchen registered successfully!");
      setSuccessMessage("Cloud Kitchen registered successfully!");
      setTimeout(() => navigate("/cloud-kitchens"), 2000);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error registering Cloud Kitchen!");
    }
  };

  // Display the success message
  { successMessage && <p className="text-green-500 text-lg">{successMessage}</p> }






  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,  // ✅ Ensure field updates correctly
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.kitchenName)) {
      newErrors.kitchenName = "Cloud Kitchen Name should only contain letters.";
    } else if (!formData.kitchenName || formData.kitchenName.length === 0) {
      newErrors.kitchenName = "Kitchen Name is required";
    }


    if (!/^[A-Za-z\s]+$/.test(formData.managerName)) {
      newErrors.managerName = "Manager Name should only contain letters.";
    } else if (!formData.managerName || formData.managerName.length === 0) {
      newErrors.managerName = "Manager Name must be between 3 and 20 characters.";
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Mobile Number must be exactly 10 digits.";
    }

    if (!/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal Code must be exactly 6 digits.";
    }

    if (!/^[A-Za-z\s]+$/.test(formData.cuisineType)) {
      newErrors.cuisineType = "Cloud Kitchen Type should only contain letters.";
    } else if (!formData.cuisineType || formData.cuisineType.length === 0) {
      newErrors.cuisineType = "Cuisine Type is required.";
    }

    if (!formData.paymentMethods || formData.paymentMethods.length === 0) {
      newErrors.paymentMethods = "At least one payment method is required.";
    } else if (!formData.paymentMethods.every(method => /^[A-Za-z\s]+$/.test(method))) {
      newErrors.paymentMethods = "Payment methods should only contain letters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;

    const selectedFile = files[0];
    setFormData({ ...formData, [name]: selectedFile });
  };




  return (
    <div className="max-w-[800px] mx-auto my-10 p-5 bg-white shadow-lg border-l-4 border-orange-500 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Cloud Kitchen Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-2 gap-8">


          {/* Kitchen Name Field */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <FaKitchenSet className="text-orange-500" />
              Cloud Kitchen Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="kitchenName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Cloud Kitchen Name"
              value={formData.kitchenName}
              onChange={handleChange}
              required
            />
            {errors.kitchenName && <p className="text-red-500 text-sm mt-1">{errors.kitchenName}</p>}
          </div>


          <div className="space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <CgProfile className="text-orange-500" />
              Owner Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="managerName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Owner Name"
              value={formData.managerName}
              onChange={handleChange}
              required
            />
            {errors.managerName && <p className="text-red-500 text-sm mt-1">{errors.managerName}</p>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <CiMobile3 className="text-orange-500" />
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Mobile Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <MdOutlineDateRange className="text-orange-500" />
              Date of Opening <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="createdAt"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              value={formData.createdAt}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 items-center">

          <div className="space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <FaAddressCard className="text-orange-500" />
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Address"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <GiWorld className="text-orange-500" />
              Select Country <span className="text-red-500">*</span>
            </label>
            <select
              name="country"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600">State</label>
            <input
              type="text"
              name="state"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>


        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600">City</label>
            <input
              type="text"
              name="city"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              <TbMapPinCode className="text-orange-500" />
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="font-semibold text-gray-600">Cuisine Type <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="cuisineType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Cuisine Type"
              value={formData.cuisineType}
              onChange={handleChange}
              required
            />
            {errors.cuisineType && <p className="text-red-500 text-sm mt-1">{errors.cuisineType}</p>}
          </div>
          <div className="space-y-2">
            <label className="font-semibold text-gray-600">Operating Hours</label>
            <div className="flex space-x-4">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Opening Time:</label>
                <input
                  type="time"
                  name="open"
                  value={formData.operatingTime.open}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operatingTime: { ...formData.operatingTime, open: e.target.value },
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm">Closing Time:</label>
                <input
                  type="time"
                  name="close"
                  value={formData.operatingTime.close}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operatingTime: { ...formData.operatingTime, close: e.target.value },
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">


          <div className="space-y-2">
            <label className="font-semibold text-gray-600">
              <span className="text-gray-700">Kitchen Type:</span>
              <select
                name="kitchenType"
                value={formData.kitchenType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              >
                <option value="VEG">Veg</option>
                <option value="NON_VEG">Non-Veg</option>
                <option value="MIXED">Mixed</option>
              </select>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block">
              <span className="font-semibold text-gray-600">Hygiene Rating:</span>
              <input
                type="number"
                name="hygieneRating"
                value={formData.hygieneRating}
                onChange={handleChange}
                min="1"
                max="5"
                required
                placeholder="Enter hygiene rating between 1 to 5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2">
            <label
              htmlFor="region"
              className="font-semibold text-gray-600">Region:</label>
            <input
              type="text"
              id="region"
              name="region"
              placeholder="Enter Region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

          </div>

          <div className="space-y-2">
            <label
              htmlFor="googleMapsLocation"
              className="font-semibold text-gray-600">Google Maps Location:</label>
            <input
              type="text"
              id="googleMapsLocation"
              name="googleMapsLocation"
              placeholder="Enter Google Map Location"
              value={formData.googleMapsLocation}
              onChange={(e) => setFormData({ ...formData, googleMapsLocation: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />

          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-5">

          <div className="space-y-2">
            <label htmlFor="gstNumber" className="font-semibold text-gray-600">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
              placeholder="Enter GST Number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div >
            <label className="font-semibold text-gray-600 flex items-center gap-2">
              Select Payment Methods <span className="text-red-500">*</span>
            </label>
            <label>
              <input
                type="checkbox"
                value="Credit Card"
                onChange={handlePaymentMethodChange}
                className="ml-1"
              />
              Credit Card
            </label>

            <label>
              <input
                type="checkbox"
                value="UPI"
                className="ml-1"
                onChange={handlePaymentMethodChange}
              />
              UPI
            </label>
            <label>
              <input
                type="checkbox"
                value="Debit Card"
                className="ml-1"
                onChange={handlePaymentMethodChange}
              />
              Debit Card
            </label>

          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-semibold text-gray-600">Upload FSSAI License <span className="text-red-500">*</span></label>
            <input
              type="file"
              name="fssaiLicenseDocument"
              accept=".pdf, .jpg, .png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              ref={fssaiLicenseDocumentRef}
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-gray-600">Upload Other Documents</label>
            <input
              type="file"
              name="necessaryDocuments"
              accept=".pdf, .jpg, .png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              ref={necessaryDocumentsRef}
              onChange={handleFileChange}
            />
          </div>
        </div>


        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"

        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CloudRegistration; 