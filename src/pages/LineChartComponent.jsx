import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/Charts.css";

const LineChartComponent = () => {
     // State to store real-time data (replaced with constant values for now)
     const [realTimeData, setRealTimeData] = useState([
        { name: "Sun", orders: 120 },
        { name: "Mon", orders: 150 },
        { name: "Tue", orders: 80 },
        { name: "Wed", orders: 200 },
        { name: "Thu", orders: 220 },
        { name: "Fri", orders: 250 },
        { name: "Sat", orders: 270 },
    ]);

    // Function to fetch real-time data from API
    // const fetchRealTimeData = async () => {
    //     try {
    //         // Replace with your actual backend API URL
    //         const response = await fetch("https://api.example.com/orders-data");
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch data");
    //         }
    //         const data = await response.json();

    //         // Ensure API data follows correct format
    //         const formattedData = data.map((entry) => ({
    //             name: entry.day,  // Day of the week (Sun, Mon, etc.)
    //             orders: entry.orders,  // Number of orders
    //         }));

    //         setRealTimeData(formattedData);
    //     } catch (error) {
    //         console.error("Error fetching real-time data:", error);
    //     }
    // };

    // // Fetch data initially and update every 5 seconds
    // useEffect(() => {
    //     fetchRealTimeData();
    //     const interval = setInterval(fetchRealTimeData, 5000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="chart-box">
            <h3 className="chart-title">Order Trends (Real-Time)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={realTimeData}>
                    <defs>
                        <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#FF6700" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#FF6700" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    
                    <XAxis dataKey="name" tick={{ fill: "#666" }} />
                    <YAxis tick={{ fill: "#666" }} />
                    <Tooltip />
                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="orders"
                        stroke="#FF6700"
                        strokeWidth={3}
                        fill="url(#colorOrder)"
                        dot={{ r: 2, fill: "#FF6700" }}
                        activeDot={{ r: 5, fill: "#FF6700" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineChartComponent;
