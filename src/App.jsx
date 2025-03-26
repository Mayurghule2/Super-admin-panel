import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ManagerDetails from "./pages/ManagerDetails"
import CloudKitchens from "./pages/CloudKitchens";
import KitchenDetails from "./pages/KitchenDetails";
import Menus from './pages/Menus';
import Notifications from './pages/Notifications';
import SignIn from './pages/SignIn';  // Import the SignIn page
import './styles/global.css';
import Messages from './pages/Messages';

import Profile from './pages/Profile';
import AdminDetails from './pages/AdminDetails';
import UpdateManagerDetails from './components/UpdateManagerDetails';
import Cregistration from "./pages/Cregistration"
import ManagerRegistration from './pages/ManagerRegistration';
import './styles/global.css';


function Layout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const isSignInPage = location.pathname === "/sign-in";

    return (
        <div className="flex h-screen">
            {!isSignInPage && <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}
            <div className="flex-1 flex flex-col">
                {!isSignInPage && <Navbar />}
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
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/update-manager/:id" element={<UpdateManagerDetails />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>  {/* ✅ Now Layout is inside Router */}
            <Layout />
        </Router>
    );
}
export default App;


