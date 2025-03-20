import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

const Profile = () => {
    // State for profile data
    const [profile, setProfile] = useState({
        fullName: "Rutuja Sawale",
        email: "rutujasawale7@example.com",
        contact: "9876543210",
        address: "123, Main Street, City, Country",
        dateOfJoining: "2023-05-10",
        achievements: "Best Kitchen Manager 2025",
        photo: "",
        dateOfBirth: "",
        gender: "",
        vegMode: false,
        rating: 4.29,
    });

    // State for form validation
    const [errors, setErrors] = useState({});

    // State for field editing
    const [editingField, setEditingField] = useState(null);

    // Handle field editing
    const toggleEdit = (field) => {
        if (editingField === field) {
            // Validate before confirming edit
            const newErrors = validateField(field, profile[field]);
            if (Object.keys(newErrors).length === 0) {
                setEditingField(null);
            } else {
                setErrors({ ...errors, ...newErrors });
            }
        } else {
            setEditingField(field);
        }
    };

    // Field validation function
    const validateField = (field, value) => {
        const newErrors = {};

        switch (field) {
            case "fullName":
                if (!value.trim()) newErrors.fullName = "Name is required";
                else if (value.trim().length < 2) newErrors.fullName = "Name is too short";
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!value.trim()) newErrors.email = "Email is required";
                else if (!emailRegex.test(value)) newErrors.email = "Invalid email format";
                break;
            case "contact":
                const phoneRegex = /^\d{10}$/;
                if (!value.trim()) newErrors.contact = "Contact number is required";
                else if (!phoneRegex.test(value)) newErrors.contact = "Contact should be 10 digits";
                break;
            default:
                break;
        }

        return newErrors;
    };

    // Handle field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setProfile({ ...profile, [name]: newValue });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile({ ...profile, photo: imageUrl });
        }
    };

    // Calculate profile completion percentage
    const calculateCompletion = () => {
        const requiredFields = ["fullName", "email", "contact", "dateOfBirth", "gender"];
        const completedFields = requiredFields.filter(field => profile[field] && profile[field].toString().trim() !== "");
        return Math.round((completedFields.length / requiredFields.length) * 100);
    };

    // Profile completion percentage
    const [completionPercentage, setCompletionPercentage] = useState(80);

    useEffect(() => {
        setCompletionPercentage(calculateCompletion());
    }, [profile]);

    return (

        <div className="flex justify-center items-center min-h-screen w-full max-w-full bg-gray-100 p-4 mt-16">
            <div className="bg-white rounded-lg shadow-md w-full max-w-lg overflow-hidden">
                {/* Profile Header */}
                <div className="relative">
                    <div className="h-24 bg-gradient-to-r from-gray-700 to-gray-500"></div>
                    <div className="absolute top-16 left-0 right-0 flex justify-center">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-grey-500 text-2xl font-bold border-4 border-white">
                                {profile.photo ? (
                                    <img src={profile.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    "R"
                                )}
                            </div>
                            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer">
                                <FaEdit className="text-orange-500" />
                            </label>
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="pt-16 px-6 pb-6">

                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Your Profile</h1>

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Full Name:</label>
                            <div className="flex"><input
                                type="text"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleChange}
                                disabled={editingField !== "fullName"}
                                className={`w-full px-3 py-2 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"
                                    } ${editingField === "fullName" ? "bg-white" : "bg-gray-50"}`}
                            />

                                <button
                                    onClick={() => toggleEdit("fullName")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md"
                                >
                                    {editingField === "fullName" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                            {errors.fullName && (
                                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Email:</label>
                            <div className="flex">
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    disabled={editingField !== "email"}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                                        } ${editingField === "email" ? "bg-white" : "bg-gray-50"}`}
                                />
                                <button
                                    onClick={() => toggleEdit("email")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md"
                                >
                                    {editingField === "email" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Contact:</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    name="contact"
                                    value={profile.contact}
                                    onChange={handleChange}
                                    disabled={editingField !== "contact"}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.contact ? "border-red-500" : "border-gray-300"
                                        } ${editingField === "contact" ? "bg-white" : "bg-gray-50"}`}
                                />
                                <button
                                    onClick={() => toggleEdit("contact")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md"
                                >
                                    {editingField === "contact" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                            {errors.contact && (
                                <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Address:</label>
                            <div className="flex">
                                <textarea
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    disabled={editingField !== "address"}
                                    className={`w-full px-3 py-2 border rounded-md ${editingField === "address" ? "bg-white" : "bg-gray-50"
                                        } border-gray-300`}
                                    rows="2"
                                ></textarea>
                                <button
                                    onClick={() => toggleEdit("address")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md self-start"
                                >
                                    {editingField === "address" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Date of Birth */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Date of Birth:</label>
                            <div className="flex">
                                <div className="relative w-full">
                                    {editingField === "dateOfBirth" ? (
                                        <input
                                            type="text"
                                            name="dateOfBirth"
                                            value={profile.dateOfBirth}
                                            onChange={handleChange}
                                            onFocus={(e) => {
                                                e.target.type = "date";
                                                e.target.showPicker();
                                            }}
                                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300"
                                            autoFocus
                                        />
                                    ) : (
                                        <div className="w-full px-3 py-2 border rounded-md bg-gray-50 border-gray-300">
                                            {profile.dateOfBirth || "Enter Date Of Birth"}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => toggleEdit("dateOfBirth")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md"
                                >
                                    {editingField === "dateOfBirth" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* Gender */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Gender:</label>
                            <div className="flex">
                                <select
                                    name="gender"
                                    value={profile.gender}
                                    onChange={handleChange}
                                    disabled={editingField !== "gender"}
                                    className={`w-full px-3 py-2 border rounded-md ${editingField === "gender" ? "bg-white" : "bg-gray-50"
                                        } border-gray-300`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <button
                                    onClick={() => toggleEdit("gender")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md"
                                >
                                    {editingField === "gender" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Date of Joining */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Date of Joining:</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={profile.dateOfJoining}
                                disabled={true}
                                className="w-full px-3 py-2 border rounded-md bg-gray-50 border-gray-300"
                            />
                        </div>

                        {/* Achievements */}
                        <div className="relative">
                            <label className="block text-gray-600 text-sm font-medium mb-1">Achievements:</label>
                            <div className="flex">
                                <textarea
                                    name="achievements"
                                    value={profile.achievements}
                                    onChange={handleChange}
                                    disabled={editingField !== "achievements"}
                                    className={`w-full px-3 py-2 border rounded-md ${editingField === "achievements" ? "bg-white" : "bg-gray-50"
                                        } border-gray-300`}
                                    rows="2"
                                ></textarea>
                                <button
                                    onClick={() => toggleEdit("achievements")}
                                    className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md self-start"
                                >
                                    {editingField === "achievements" ? (
                                        <FaCheck className="text-orange-500" />
                                    ) : (
                                        <FaEdit className="text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Veg Mode Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 font-medium">Veg Mode</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="vegMode"
                                    checked={profile.vegMode}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                        </div>

                        {/* Profile Completion */}
                        <div className="mt-4">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                                <span className="text-sm font-medium text-orange-600">{completionPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-orange-500 h-2 rounded-full"
                                    style={{ width: `${completionPercentage}%` }}
                                >
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-600 font-medium">Your Rating</span>
                            <div className="flex items-center">
                                <span className="text-lg font-semibold">{profile.rating}</span>
                                <svg className="w-5 h-5 text-orange-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md mt-6 transition duration-300"
                            onClick={() => setEditingField(null)}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;