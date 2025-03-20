import React, { useState, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    CartesianGrid, ReferenceDot
} from "recharts";
import "../styles/Charts.css";

const TotalRevenueChart = () => {
    // State to store real-time data
    // const [realTimeData, setRealTimeData] = useState([]);

    // // Function to fetch real-time data from API
    // const fetchRealTimeData = async () => {
    //     try {
    //         // Replace with your actual backend API URL
    //         const response = await fetch("https://api.example.com/revenue-data");
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch data");
    //         }
    //         const data = await response.json();

    //         // Ensure API data follows correct format
    //         const formattedData = data.map((entry) => ({
    //             month: entry.month,
    //             revenue2020: entry.revenue2020,
    //             revenue2021: entry.revenue2021,
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


    // Using constant values for temporary purpose
    const realTimeData = [
        { month: "Jan", revenue2020: 12034, revenue2021: 24322 },
        { month: "Feb", revenue2020: 17456, revenue2021: 28976 },
        { month: "Mar", revenue2020: 21456, revenue2021: 33890 },
        { month: "Apr", revenue2020: 27890, revenue2021: 39543 },
        { month: "May", revenue2020: 32567, revenue2021: 34987 },
        { month: "Jun", revenue2020: 36789, revenue2021: 48432 },
        { month: "Jul", revenue2020: 41023, revenue2021: 53678 },
        { month: "Aug", revenue2020: 45987, revenue2021: 57890 },
        { month: "Sep", revenue2020: 51234, revenue2021: 63876 },
        { month: "Oct", revenue2020: 56987, revenue2021: 69432 },
        { month: "Nov", revenue2020: 61234, revenue2021: 73210 },
        { month: "Dec", revenue2020: 67890, revenue2021: 79543 }
    ];
    return (
        <div className="chart-box">
            <h3 className="chart-title">Total Revenue (Real-Time)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={realTimeData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorRevenue2020" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#FF6700" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#FF6700" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRevenue2021" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#FF914D" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#FF914D" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="month" tick={{ fill: "#666" }} />
                    <YAxis tick={{ fill: "#666" }} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

                    {/* 2020 Revenue Line */}
                    <Line
                        type="monotone"
                        dataKey="revenue2020"
                        stroke="#FF6700"
                        strokeWidth={3}
                        fill="url(#colorRevenue2020)"
                        dot={{ r: 2, fill: "#FF6700" }}
                        activeDot={{ r: 5, fill: "#FF6700" }}
                    />

                    {/* 2021 Revenue Line */}
                    <Line
                        type="monotone"
                        dataKey="revenue2021"
                        stroke="#FF914D"
                        strokeWidth={3}
                        fill="url(#colorRevenue2021)"
                        dot={{ r: 2, fill: "#FF914D" }}
                        activeDot={{ r: 5, fill: "#FF914D" }}
                    />

                    {/* Reference Dots for Highlighted Values */}
                    {realTimeData.length > 0 && (
                        <>
                            <ReferenceDot x="May" y={realTimeData.find(d => d.month === "May")?.revenue2020} r={5} fill="#FF6700" />
                            <ReferenceDot x="Oct" y={realTimeData.find(d => d.month === "Oct")?.revenue2021} r={5} fill="#FF914D" />
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalRevenueChart;
