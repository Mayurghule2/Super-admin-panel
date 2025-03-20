import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

const ManagerRegistration = () => {
  const initialFormState = {
    firstName: "",
    middleName: "",
    lastName: "",
    name: "",
    birthDate: "",
    mobileNumber: "",
    role: "",
    gender: "",
    email: "",
    address: "",
    country: "",
    postalCode: "",
    bankBranch: "",
    accountHolder: "",
    accountNumber: "",
    ifscNumber: "",
    profilePicture: "",
    aadharCard: "",
    panCard: "",
    passbookPhoto: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const profilePicRef = useRef(null);
  const aadharCardRef = useRef(null);
  const panCardRef = useRef(null);
  const passbookPhotoRef = useRef(null);

  // this function use to change form data 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // function usedd to change the selected file or add new file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // this function use to change date of birth in the form
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      birthDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData(initialFormState);

    if (profilePicRef.current) profilePicRef.current.value = "";
    if (aadharCardRef.current) aadharCardRef.current.value = "";
    if (panCardRef.current) panCardRef.current.value = "";
    if (passbookPhotoRef.current) passbookPhotoRef.current.value = "";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border-l-4 border-orange-500 mt-16">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center" >Manager Registration</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4">
        <div className="flex items-center">
          <span className="text-red-500">*</span>
          {/* <MdOutlineDriveFileRenameOutline   /> */}
          <label
            className="block font-semibold text-gray-700 mr-2">
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

        <div className="flex items-center">
          {/* <MdOutlineEmail /> */}
          <span className="text-red-500">*</span>
          <label
            className="block font-semibold text-gray-700 mr-2">
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

        <div className="grid grid-cols-2 mr-10">
          <div className="flex items-center">
            <span className="text-red-500">*</span>
            <label className="block font-semibold text-gray-700 mr-2">Date Of Birth :</label>
            <DatePicker
              selected={formData.birthDate}
              onChange={handleDateChange}
              dateFormat="dd-MM-yyyy"
              placeholderText="Select Date"
              className="w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              maxDate={new Date()}
              required
            />
          </div>
          <div className="flex items-center">
            <span className="text-red-500">*</span>
            <label
              className="block font-semibold text-gray-700 mr-2" >
              Mobile :
            </label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              className="w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength={15} required />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center">
            <span className="text-red-500">*</span>
            <label
              className="block font-semibold text-gray-700 mr-2">
              Role :
            </label>
            <select
              name="role"
              className="w-1/3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.role}
              onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="Manager">Manager</option>
            </select>
          </div>


          <div className=" flex items-center mr-2">
            <span className="text-red-500">*</span>
            <label className="block font-semibold text-gray-700 mr-2 mb-1">Gender :</label>
            <div className="flex gap-6">
              {["Male", "Female", "Other"].map((gender) => (
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
        <div className="flex items-center">
          <span className="text-red-500">*</span>
          <label
            className="block font-semibold text-gray-700 mr-2">
            Address :
          </label>
          <input
            type="text"
            placeholder="Enter Address..."
            name="address"
            className="w-9/12 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
            value={formData.address}
            onChange={handleChange}
            maxLength={100} required />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex items-center ">
            <span className="text-red-500">*</span>
            <label className="block font-semibold text-gray-700 mr-2">
              Country :
            </label>
            <select
              name="country"
              className="w-2/3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.country}
              onChange={handleChange} required>
              <option value="">Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <div className="flex items-center">
            <span className="text-red-500">*</span>
            <label className="block font-semibold text-gray-700 mr-2">
              Postal Code :
            </label>
            <input
              type="text"
              placeholder="Enter Postal Code"
              name="postalCode"
              className="w-4/6 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.postalCode}
              onChange={handleChange}
              maxLength={10} required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 ">

        
          <div className="flex items-center">
              <span className="text-red-500">*</span>
            <label className="block font-semibold text-gray-700 mr-2">
              Account Number :
            </label>
            <input
              type="text"
              placeholder="Enter Account Number "
              name="accountNumber"
              className="w-48 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.accountNumber}
              onChange={handleChange}
              maxLength={30} required />
          </div>
          <div className="flex items-center">
              <span className="text-red-500">*</span>
            <label className="block font-semibold text-gray-700 mr-2">
              IFSC Number :
            </label>
            <input
              type="text"
              placeholder="Enter IFSC Number"
              name="ifscNumber"
              className="w-56 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
              value={formData.ifscNumber}
              onChange={handleChange}
              maxLength={11} required />
          </div>
        
        </div>


        <div className="space-y-2 mt-5">
          <label className="block font-semibold text-gray-700"> <span className="text-red-500">*</span>Upload Profile Picture</label>
        
          <input
            type="file"
            name="profilePicture"
            ref={profilePicRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
            required />
          <label className="block font-semibold text-gray-700"><span className="text-red-500">*</span>Upload Aadhar Card</label>
          <input
            type="file"
            name="aadharCard"
            ref={aadharCardRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
            required />
          <label className="block font-semibold text-gray-700"><span className="text-red-500">*</span>Upload Pan Card</label>
          <input
            type="file"
            name="panCard"
            ref={panCardRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer"
            required />
          <label className="block font-semibold text-gray-700"><span className="text-red-500">*</span>Upload Passbook</label>
          <input
            type="file"
            name="passbookPhoto"
            ref={passbookPhotoRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-orange-500 file:text-white file:rounded-md file:cursor-pointer" />
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

export default ManagerRegistration;