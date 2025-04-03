import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaSearch, FaBell, FaEnvelope, FaUserCircle, FaBars } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); 
    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-container')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Function to close dropdown when clicking on Profile or Logout
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Clear auth token (if any)
        setDropdownOpen(false); // Close the dropdown
        navigate("/"); // Redirect to sign-in page
    };

    return (
        <div className="navbar ">
            <div className="navbar-left">
                {/* <FaBars className="menu-icon" /> */}
            </div>
            {/* <div className="navbar-center">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search here" />
                </div>
            </div> */}
            <div className="navbar-right ">
                <Link to="/messages" className="icon">
                    <FaEnvelope />
                </Link>
                <Link to="/Notifications" className="icon">
                    <FaBell />
                </Link>
                <div className="profile-container">
                    <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
                    {dropdownOpen && (
                         <div className="dropdown-menu">
                         <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</Link>
                         <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                     </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;


