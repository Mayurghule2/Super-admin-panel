import React, { useState, useRef } from "react";
import { FaKitchenSet } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { CiMobile3 } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { TbMapPinCode } from "react-icons/tb";
import { IoDocumentText } from "react-icons/io5";

const CloudRegistration = () => {
   const initialFormState = {
      kitchenName: "",
      ownerName: "",
      phoneNumber: "",
      createdAt: "",
      Location: "",
      Region: "",
      City: "",
      postalCode: "",
      State: "",
      kitchenType: "",
      fromTime: "",
      toTime: "",
      fssaiDoc: "",
      otherDo: "",
    };
  
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const fromTimeRef = useRef(null);
    const toTimeRef = useRef(null);
    const fssaiDocRef = useRef(null);
    const otherDoRef = useRef(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };
  
    const validateForm = () => {
      let newErrors = {};
    
      if (!/^[A-Za-z\s]+$/.test(formData.kitchenName)) {
          newErrors.kitchenName = "Cloud Kitchen Name should only contain letters.";
        } else if (formData.kitchenName.length < 3 || formData.kitchenName.length > 20) {
        newErrors.kitchenName = "Cloud Kitchen Name must be between 3 and 20 characters.";
      }
  
      if (!/^[A-Za-z\s]+$/.test(formData.ownerName)) {
          newErrors.ownerName = "Owner Name should only contain letters.";
        } else if (formData.ownerName.length < 3 || formData.ownerName.length > 20) {
        newErrors.ownerName = "Owner Name must be between 3 and 20 characters.";
      }
  
      if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Mobile Number must be exactly 10 digits.";
      }
  
      if (!/^\d{6}$/.test(formData.postalCode)) {
        newErrors.postalCode = "Postal Code must be exactly 6 digits.";
      }
     
      if (!/^[A-Za-z\s]+$/.test(formData.kitchenType)) {
          newErrors.kitchenType = "Cloud Kitchen Type should only contain letters.";
        } else if (formData.kitchenType.length < 3 || formData.kitchenType.length > 10) {
        newErrors.kitchenType = "Cuisine Type must be between 3 and 10 characters.";
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Returns true if no errors
    };
  
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setFormData({ ...formData, [name]: files[0] });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Submitted:", formData);
      if (!validateForm()) {
          return; // Stop submission if validation fails
        }
    
      setFormData(initialFormState);
  
      if (fromTimeRef.current) fromTimeRef.current.value = "";
      if (toTimeRef.current) toTimeRef.current.value = "";
      if (fssaiDocRef.current) fssaiDocRef.current.value = "";
      if (otherDoRef.current) otherDoRef.current.value = "";
    };
  

  return (
    <div className="max-w-[800px] mx-auto my-10 p-5 bg-white shadow-lg border-l-4 border-orange-500 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Cloud Kitchen Registration
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
            name="ownerName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          {errors.ownerName && <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>}
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

       
        <div className="space-y-2">
          <label className="font-semibold text-gray-600 flex items-center gap-2">
            <FaAddressCard className="text-orange-500" />
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            placeholder="Address"
            value={formData.Location}
            onChange={handleChange}
            required
          />
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
              name="State"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="State"
              value={formData.State}
              onChange={handleChange}
            />
          </div>
        </div>

       
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex-1 space-y-2">
            <label className="font-semibold text-gray-600">City</label>
            <input
              type="text"
              name="City"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="City"
              value={formData.City}
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

     
        <div className="space-y-2">
          <label className="font-semibold text-gray-600">Cuisine Type <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="kitchenType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            placeholder="Cuisine Type"
            value={formData.kitchenType}
            onChange={handleChange}
            required
          />
          {errors.kitchenType && <p className="text-red-500 text-sm mt-1">{errors.kitchenType}</p>}
        </div>

       
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2">  <IoDocumentText  className="text-orange-500"/>  Upload FSSAI License <span className="text-red-500">*</span></label>
            <input
              type="file"
              name="fssaiDoc"
              className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              ref={fssaiDocRef}
              onChange={handleFileChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-semibold text-gray-600 flex items-center gap-2"><IoDocumentText   className="text-orange-500" />Upload Other Documents</label>
            <input
              type="file"
              name="otherDo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              ref={otherDoRef}
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
