import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle, FaBars } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
    const closeDropdown = () => {
        setDropdownOpen(false);
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
                <Link to="/notifications" className="icon">
                    <FaBell />
                </Link>
                <div className="profile-container">
                    <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/profile" className="dropdown-item" onClick={closeDropdown}>Profile</Link>
                            <Link to="/logout" className="dropdown-item" onClick={closeDropdown}>Logout</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;


