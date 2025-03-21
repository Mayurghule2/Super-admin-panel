import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    FaBars, FaTachometerAlt, FaUtensils, FaCog, FaCloud, 
    FaUserTie, FaClipboardList, FaCalendarAlt, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    return (
        <div className={`bg-white min-h-screen p-4 transition-all duration-500 ease-in-out ${isOpen ? 'w-[150px] md:w-64' : 'sm:w-12 md:w-24'}`}>
            <div className="flex flex-col mt-5">
                <button className="text-2xl text-gray-600 hover:text-gray-800 transition-transform duration-700 ease-in-out" onClick={toggleSidebar}>
                    <FaBars  />
                </button>
                {isOpen && <h2 className="text-xs md:text-2xl font-bold text-gray-600 mt-5 shadow-sm">Taste Of India</h2>}
            </div>

            <ul className="mt-6 space-y-2 text-gray-600">
                <li className={`p-3 flex items-center gap-2 rounded-md cursor-pointer ${location.pathname === '/' ? 'bg-orange-500 text-gray-800' : 'hover:bg-orange-500 hover:text-gray-800'}`} onClick={() => navigate('/')}> 
                    <FaTachometerAlt className='text-xl' /> {isOpen && <span className='font-semibold text-xs lg:text-lg'>Dashboard</span>} 
                </li>

                <li className={`p-3 flex items-center gap-2 rounded-md cursor-pointer ${location.pathname === '/admin-details' ? 'bg-orange-500 text-gray-800' : 'hover:bg-orange-500 hover:text-gray-800'}`} onClick={() => navigate('/admin-details')}>
                <FaUserTie className='text-xl' /> {isOpen && <span className='font-semibold text-xs lg:text-lg '>Admin Details</span>}
                </li>

                <li className="relative">
                    <div className="p-3 rounded-md cursor-pointer flex justify-between hover:bg-orange-500 hover:text-gray-800" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="flex items-center gap-2">
                            <FaClipboardList className='text-xl' /> {isOpen && <span className='font-semibold text-xs lg:text-lg'>Registration</span>}
                        </div>
                        {isOpen && (isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
                    </div>
                    {isDropdownOpen && (
                        <ul className="pl-6 space-y-1">
                            <li className="p-3 rounded-md cursor-pointer hover:bg-orange-500 hover:text-gray-800 flex items-center gap-2" onClick={() => navigate('/registration/add-manager')}>
                                <FaUserTie className='text-lg' /> {isOpen && <span className='font-semibold text-xs lg:text-sm'>Add New Manager</span>}
                            </li>
                            <li className="p-3 rounded-md cursor-pointer hover:bg-orange-500 hover:text-gray-800 flex items-center gap-2" onClick={() => navigate('/registration/add-kitchen')}>
                                <FaCloud className='text-lg' /> {isOpen && <span className='font-semibold text-xs lg:text-sm'>Add New Cloud Kitchen</span>}
                            </li>
                        </ul>
                    )}
                </li>

                <li className={`p-3 flex items-center gap-2 rounded-md cursor-pointer ${location.pathname === '/cloud-kitchens' ? 'bg-orange-500 text-gray-800' : 'hover:bg-orange-500 hover:text-gray-800'}`} onClick={() => navigate('/cloud-kitchens')}>
                    <FaCloud className='text-xl' /> {isOpen && <span className='font-semibold text-xs lg:text-lg'>Cloud Kitchens</span>}
                </li>

                <li className={`p-3 flex items-center gap-2 rounded-md cursor-pointer ${location.pathname === '/menus' ? 'bg-orange-500 text-gray-800' : 'hover:bg-orange-500 hover:text-gray-800'}`} onClick={() => navigate('/menus')}>
                    <FaUtensils className='text-xl' /> {isOpen && <span className='font-semibold text-xs lg:text-lg'>Menus</span>}
                </li>

                {/* <li className={`p-3 flex items-center gap-2 rounded-md cursor-pointer ${location.pathname === '/calendar' ? 'bg-orange-600' : 'hover:bg-orange-600'}`} onClick={() => navigate('/calendar')}>
                    <FaCalendarAlt /> {isOpen && <span className='font-semibold'>Calendar</span>}
                </li>

                <li className={`p-3 flex items-center gap-2 rounded-md cursor-pointer ${location.pathname === '/settings' ? 'bg-orange-600' : 'hover:bg-orange-600'}`} onClick={() => navigate('/settings')}>
                    <FaCog /> {isOpen && <span className='font-semibold'>Settings</span>}
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
