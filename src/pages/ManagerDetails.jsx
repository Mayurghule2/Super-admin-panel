import React from "react";
import { useParams } from "react-router-dom";
import { Trash } from "lucide-react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const managers = [
  { name: "MS Dhoni", kitchen: "Biryani House", city: "Amravati", state: "Maharashtra", status: "Active", email: "msdhoni@gmail.com", phone: "1234567810", bank: "12345678233", createdAt: "07-March-2025" },
  { name: "Rohit Sharma", kitchen: "Taste of South", city: "Mysuru", state: "Karnataka", status: "Inactive", email: "rohitsharma@gmail.com", phone: "1234567890", bank: "9876543210", createdAt: "10-April-2025" },
  { name: "Virat Kohli", kitchen: "Khamaas Veg", city: "Delhi", state: "Delhi", status: "Active", email: "viratkohli@gmail.com", phone: "9876543210", bank: "1122334455", createdAt: "15-May-2025" },
  { name: "Suresh Raina", kitchen: "Tandoori House", city: "Lucknow", state: "Uttar Pradesh", status: "Active", email: "sureshraina@gmail.com", phone: "7894561230", bank: "2233445566", createdAt: "20-June-2025" },
  { name: "Jasprit Bumrah", kitchen: "Punjabi Tadka", city: "Amritsar", state: "Punjab", status: "Active", email: "jaspritbumrah@gmail.com", phone: "7891234560", bank: "3344556677", createdAt: "25-July-2025" },
];

const ManagerDetail = () => {
  const { name } = useParams();
  const manager = managers.find(m => m.name === name);

  if (!manager) {
    return <div className="text-center text-red-500 mt-10 text-lg font-semibold">Manager not found.</div>;
  }

  return (
    <div className="mt-10 flex justify-center items-center min-h-screen w-full p-4">
      <Link to="/admin-details" className="text-3xl mt-16 mb-auto text-black">
        <IoArrowBackOutline />
      </Link>
      <div className="w-full max-w-full bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <div className="flex items-center space-x-4 mb-6 justify-between">

          <div className="flex items-center">

            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-3xl font-bold text-white">👤</span>
            </div>
            <div className="flex flex-col mt-12">
              <h2 className="text-2xl font-bold text-gray-800">{manager.name}</h2>
              <p className="text-gray-600">Manager at <span className="font-semibold">{manager.kitchen}</span></p>
              <p className="text-gray-500 text-sm">{manager.city}, {manager.state}</p>
            </div>
          </div>
          <div className="">
            <button className=" flex items-center bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition duration-300 shadow-md ">
              <Trash className="w-4 h-4 mr-1" /> Delete
            </button>
          </div>
        </div>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Email:</strong> {manager.email}</p>
          <p><strong>Phone No.:</strong> {manager.phone}</p>
          <p><strong>Bank Account No.:</strong> {manager.bank}</p>
          <p><strong>Created At:</strong> {manager.createdAt}</p>
          <p className="flex items-center">
            <strong>Status:</strong>
            <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full shadow-md ${manager.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {manager.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetail;