import React, { useState, useRef,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';



const ManagerRegistration = () => {
  
  const initialFormState = {
    name: "",
    birthDate: "",
    phone: "",
    role: "",
    gender: "",
    email: "",
    address: "",
    country: "",
    postalCode: "",
    bankBranch: "",
    accountHolder: "",
    bankAccountNumber: "",
    ifscCode: "",
    profilePicture: "",
    aadharCard: "",
    panCard: "",
    passbookPhoto: "",
    cloudKitchenId:"",
  };

  const [formData, setFormData] = useState(initialFormState);
  const profilePicRef = useRef(null);
  const aadharCardRef = useRef(null);
  const panCardRef = useRef(null);
  const passbookPhotoRef = useRef(null);
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
  // this function use to change form data 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the value for cloudKitchenId
    });
  };
  

  // function usedd to change the selected file or add new file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length === 0) return;

    const selectedFile = files[0];
    setFormData({ ...formData, [name]: selectedFile });
  };


  // this function use to change date of birth in the form
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      birthDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   const formDataToSend = new FormData();
   
  
    formData.cloudKitchenId = uuidv4(); // Generate UUID if no cloudKitchenId is selected
  
  // Add the cloudKitchenId to formDataToSend
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
    console.log("Submitting data:", formData);


    try {
      // Step 1: Register the manager
      const response = await axios.post("http://localhost:9090/api/managers/register",
        formDataToSend,
        { headers: { "Content-Type": "application/json" } });

      console.log("Response:", response.data);
      alert("Response: Cloud Kitchen registered successfully!");
      
      setTimeout(() => navigate("/admin-details"), 2000);
      setFormData(initialFormState);

      // if (newManager?.id) {
      //   const managerId = newManager.id;
      //   // Step 2: Upload files one by one
      //   if (formData.profilePicture) {
      //     await uploadProfilePicture(managerId, formData.profilePicture);
      //   }
      //   if (formData.aadharCard) {
      //     await uploadAadharCard(managerId, formData.aadharCard);
      //   }
      //   if (formData.panCard) {
      //     await uploadPanCard(managerId, formData.panCard);
      //   }
      // }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error registering Cloud Kitchen!");
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 bg-transparent shadow-lg rounded-lg border-l-4 border-orange-500 mt-16">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center" >Manager Registration</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4">

        <div className="grid grid-cols-2">
          <div className="">
            {/* <MdOutlineDriveFileRenameOutline   /> */}
            <label
              className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Name :
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.name}
              onChange={handleChange}
              maxLength={50} required />
          </div>

          <div className="">
            {/* <MdOutlineEmail /> */}
            <label
              className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Email :
            </label>
            <input
              type="email"
              placeholder="Enter e-mail"
              name="email"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.email}
              onChange={handleChange}
              required />
          </div>
        </div>
        <div className="grid grid-cols-2 ">
          <div className="">
            <label
              className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Address :
            </label>
            <input
              type="text"
              placeholder="Enter Address..."
              name="address"
              className="w-72 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.address}
              onChange={handleChange}
              maxLength={100} required />
          </div>


          <div className="">
            <label
              className="block font-semibold text-gray-700 mr-2" >
              <span className="text-red-500">*</span>
              Mobile :
            </label>
            <PhoneInput
              country="in"
              name="phone"
              placeholder="Enter Mobile Number"
              containerClass="flex "
              inputClass="w-full md:w-1/3 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none p-2"
              buttonClass="!border-r-0"
              dropdownClass="!bg-white !shadow-md"
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              required
            />

          </div>
        </div>

        <div className="grid grid-cols-2">

          <div>

            <label className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Date Of Birth :
            </label>
            <DatePicker
              selected={formData.birthDate}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className="w-72 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              maxDate={new Date()}
              required
            />
          </div>

          <div className=" ">
            <label className="block font-semibold text-gray-700 mr-2 mb-1">
              <span className="text-red-500">*</span>

              Gender :
            </label>
            <div className="flex gap-6">
              {["MALE", "FEMALE", "OTHER"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className=""
                  />
                  <span className="text-gray-700 font-medium">{gender}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">

          <div className="">
            <label
              className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Role :
            </label>
            <select
              name="role"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.role}
              onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="SUPERVISOR">Supervisor</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div>
          <label
              className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Cloud Kitchen ID :
            </label>
            <select
              name="cloudKitchenId"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.cloudKitchenId || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Cloud Kitchen</option>
              {kitchens.length > 0 ? (
                kitchens.map((kitchen) => (
                  <option key={kitchen.kitchenId} value={kitchen.uuid}> {/* Make sure kitchen.id is correct */}
                    {kitchen.city} - {kitchen.kitchenId} 
                  </option>
                ))
              ) : (
                <option disabled>Loading...</option>
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className=" ">
            <label className="block font-semibold text-gray-700 mr-2">
              <span className="text-red-500">*</span>
              Country :
            </label>
            <select
              name="country"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.country}
              onChange={handleChange} required>
              <option value="">Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="">
            <label className="block font-semibold text-gray-700 ">
              <span className="text-red-500">*</span>
              Postal Code :
            </label>
            <input
              type="text"
              placeholder="Enter Postal Code"
              name="postalCode"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.postalCode}
              onChange={handleChange}
              maxLength={6} required />
          </div>
        </div>

        <div className="grid grid-cols-2">

          <div className="">
            <label className="block font-semibold text-gray-700 ">
              <span className="text-red-500">*</span>
              Account Number :
            </label>
            <input
              type="text"
              placeholder="Enter Account Number "
              name="bankAccountNumber"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              maxLength={20} required />
          </div>
          <div className="">
            <label className="block font-semibold text-gray-700">
              <span className="text-red-500">*</span>
              IFSC Number :
            </label>
            <input
              type="text"
              placeholder="Enter IFSC Number"
              name="ifscCode"
              className="w-4/5 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.ifscCode}
              onChange={handleChange}
              maxLength={11} required />
          </div>

        </div>


        <div className="mt-5 grid grid-cols-2">
          <div className="mb-3">
            <label className="block font-semibold text-gray-700"> <span className="text-red-500">*</span>Upload Profile Picture</label>

            <input
              type="file"
              name="profilePicture"
              ref={profilePicRef}
              onChange={handleFileChange}
              className="w-4/5 px-3 py-2 border border-gray-400 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              required />
          </div>

          <div>
            <label className="block font-semibold text-gray-700"><span className="text-red-500">*</span>Upload Aadhar Card</label>
            <input
              type="file"
              name="aadharCard"
              ref={aadharCardRef}
              onChange={handleFileChange}
              className="w-4/5 px-3 py-2 border border-gray-400 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              required />
          </div>
          {/* <div>


            <label className="block font-semibold text-gray-700"><span className="text-red-500">*</span>Upload Pan Card</label>
            <input
              type="file"
              name="panCard"
              ref={panCardRef}
              onChange={handleFileChange}
              className="w-4/5 px-3 py-2 border border-gray-400 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
              required />
          </div> */}
          {/* <div>


            <label className="block font-semibold text-gray-700"><span className="text-red-500">*</span>Upload Passbook</label>
            <input
              type="file"
              name="passbookPhoto"
              ref={passbookPhotoRef}
              onChange={handleFileChange}
              className="w-4/5 px-3 py-2 border border-gray-400 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer" />
          </div> */}
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ManagerRegistration