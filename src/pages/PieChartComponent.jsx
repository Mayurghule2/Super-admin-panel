import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/Charts.css";

const COLORS = ["#FF6700", "#FFAB73", "#FFD3B6"];

const PieChartComponent = () => {
    // State to store real-time data (replaced with constant values for now)
    const [realTimeData, setRealTimeData] = useState({
        totalOrders: 100,
        deliveredOrders: 80,
        canceledOrders: 20,
        customerGrowth: 150,
        totalRevenue: 50000,
        prevCustomerGrowth: 120,
        prevTotalRevenue: 45000,
    });

    /* 
    // Fetch real-time data from an API every 5 seconds
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace this with your actual API endpoint
                const response = await fetch("https://api.example.com/realtime-data");
                const data = await response.json();

                setRealTimeData({
                    totalOrders: data.totalOrders,
                    deliveredOrders: data.deliveredOrders,
                    canceledOrders: data.canceledOrders,
                    customerGrowth: data.customerGrowth,
                    totalRevenue: data.totalRevenue,
                    prevCustomerGrowth: data.prevCustomerGrowth || 0, // Fallback if data is missing
                    prevTotalRevenue: data.prevTotalRevenue || 0,
                });
            } catch (error) {
                console.error("Error fetching real-time data:", error);
            }
        };

        // Fetch data initially and set interval for updates
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);
    */

    // Prepare Pie Chart Data
    const ordersBreakdownData = [
        { name: "Delivered Orders", value: realTimeData.deliveredOrders },
        { name: "Canceled Orders", value: realTimeData.canceledOrders },
    ];

    const customerGrowthData = [
        { name: "Current Month", value: realTimeData.customerGrowth },
        { name: "Previous Month", value: realTimeData.prevCustomerGrowth },
    ];

    const revenueData = [
        { name: "Current Month", value: realTimeData.totalRevenue },
        { name: "Previous Month", value: realTimeData.prevTotalRevenue },
    ];

    return (
        <div className="chart-container">
            <h2 className="chart-main-title text-center mt-5 mb-5 text-xl font-bold">Real-Time Data</h2>

            <div className="chart-row">
                {/* Pie Chart for Order Breakdown */}
                <div className="chart-box">
                    <h3 className="chart-title">Order Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={ordersBreakdownData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {ordersBreakdownData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart for Customer Growth */}
                <div className="chart-box">
                    <h3 className="chart-title">Customer Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={customerGrowthData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {customerGrowthData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart for Revenue */}
                <div className="chart-box">
                    <h3 className="chart-title">Revenue Comparison</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={revenueData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={75}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}`}
                            >
                                {revenueData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PieChartComponent;
