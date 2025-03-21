import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ManagerDetails from "./pages/ManagerDetails"
import CloudKitchens from "./pages/CloudKitchens";
import KitchenDetails from "./pages/KitchenDetails";
import Menus from './pages/Menus';

import Messages from './pages/Messages';

import Profile from './pages/Profile';
import AdminDetails from './pages/AdminDetails';
import UpdateManagerDetails from './components/UpdateManagerDetails';
import Cregistration from "./pages/Cregistration"
import ManagerRegistration from './pages/ManagerRegistration';
import './styles/global.css';


function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <Router>
            <div className="flex h-screen">
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 p-4 overflow-auto">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/registration/add-kitchen" element={<Cregistration />} />
                            <Route path="/registration/add-manager" element={<ManagerRegistration />} />
                            <Route path="/admin-details" element={<AdminDetails />} />
                            <Route path="/manager-details/:name" element={<ManagerDetails />} />
                            <Route path="/cloud-kitchens" element={<CloudKitchens />} />
                            <Route path="/cloud-kitchens/:id" element={<KitchenDetails />} />
                            <Route path="/menus" element={<Menus />} />

                            <Route path="/messages" element={<Messages />} />
                            

                            <Route path="/profile" element={<Profile />} />
                            <Route path="/update-manager/:id" element={<UpdateManagerDetails />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
