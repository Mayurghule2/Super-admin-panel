import React, { useState, useEffect } from 'react';
import PaymentMethods from './PaymentMethods.jsx';
import DashboardWidget from '../components/DashboardWidget';
import PieChartComponent from './PieChartComponent';
import LineChartComponent from './LineChartComponent';
import TotalRevenueChart from '../pages/TotalRevenueChart';
import {
    Fastfood,
    LocalShipping,
    Cancel,
    MonetizationOn
} from '@mui/icons-material';
import '../styles/Dashboard.css';

const Dashboard = () => {
    // Real-time state for dashboard stats
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalDelivered, setTotalDelivered] = useState(0);
    const [totalCanceled, setTotalCanceled] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Function to fetch real-time data (Simulated API Call)
    const fetchRealTimeData = async () => {
        try {
            // Simulated API call - Replace with actual API endpoint
            const response = await fetch("https://api.example.com/dashboard-stats");
            const data = await response.json();

            setTotalOrders(data.totalOrders);
            setTotalDelivered(data.totalDelivered);
            setTotalCanceled(data.totalCanceled);
            setTotalRevenue(data.totalRevenue);
        } catch (error) {
            console.error("Error fetching real-time data:", error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchRealTimeData();

        // Update data every 5 seconds
        const interval = setInterval(fetchRealTimeData, 5000);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        
            <div className="dashboard-content ">
                <h2 className='text-2xl font-bold text-center'>Dashboard</h2>

                {/* Widgets with Real-Time Data */}
                <div className="widget-container">
                    <DashboardWidget 
                        title="Total Orders" 
                        value={totalOrders} 
                        icon={<Fastfood sx={{ fontSize: 40, color: "#FF914D" }} />} 
                    />
                    <DashboardWidget 
                        title="Total Delivered" 
                        value={totalDelivered} 
                        icon={<LocalShipping sx={{ fontSize: 40, color: "#FF914D" }} />} 
                    />
                    <DashboardWidget 
                        title="Total Cancelled" 
                        value={totalCanceled} 
                        icon={<Cancel sx={{ fontSize: 40, color: "#FF914D" }} />} 
                    />
                    <DashboardWidget 
                        title="Total Revenue" 
                        value={`₹${totalRevenue}`} 
                        icon={<MonetizationOn sx={{ fontSize: 40, color: "#FF914D" }} />} 
                    />
                </div>

                <div className="charts-container">
                    <PieChartComponent />
                   
                </div>
                <div className="trends-container">
                    <LineChartComponent title="Order Trends" />
                    <PaymentMethods title="Payment Methods" />
                    <TotalRevenueChart title="Total Revenue" />
                </div>
            </div>
       
    );
};

export default Dashboard;
