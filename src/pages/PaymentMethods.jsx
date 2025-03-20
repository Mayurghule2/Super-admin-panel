import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "../styles/Charts.css"

const PaymentMethodChart = () => {
    // State to store payment method data
    const [paymentData, setPaymentData] = useState([
        { name: "Sun", Cash: 40, UPI: 50, CreditCard: 30, DebitCard: 25, Wallet: 20 },
        { name: "Mon", Cash: 45, UPI: 55, CreditCard: 35, DebitCard: 30, Wallet: 25 },
        { name: "Tue", Cash: 50, UPI: 60, CreditCard: 40, DebitCard: 35, Wallet: 30 },
        { name: "Wed", Cash: 55, UPI: 65, CreditCard: 45, DebitCard: 40, Wallet: 35 },
        { name: "Thu", Cash: 60, UPI: 70, CreditCard: 50, DebitCard: 45, Wallet: 40 },
        { name: "Fri", Cash: 65, UPI: 75, CreditCard: 55, DebitCard: 50, Wallet: 45 },
        { name: "Sat", Cash: 70, UPI: 80, CreditCard: 60, DebitCard: 55, Wallet: 50 },
    ]);

    // Function to fetch real-time data from API (TEMPORARILY DISABLED)
    // const fetchPaymentData = async () => {
    //     try {
    //         const response = await fetch("https://api.example.com/payment-method-data");
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch data");
    //         }
    //         const data = await response.json();

    //         // Formatting API response data
    //         const formattedData = data.map((entry) => ({
    //             name: entry.day,  
    //             Cash: entry.cashPayments,
    //             UPI: entry.upiPayments,
    //             CreditCard: entry.creditCardPayments,
    //             DebitCard: entry.debitCardPayments,
    //             Wallet: entry.walletPayments,
    //         }));

    //         setPaymentData(formattedData);
    //     } catch (error) {
    //         console.error("Error fetching real-time payment data:", error);
    //     }
    // };

    // // Fetch data initially and update every 5 seconds (TEMPORARILY DISABLED)
    // useEffect(() => {
    //     fetchPaymentData();
    //     const interval = setInterval(fetchPaymentData, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="chart-box">
            <h3 className="chart-title">Payment Methods Usage (Real-Time)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentData} barSize={20}>   {/* Reduced Bar Width */}
                    <XAxis dataKey="name" tick={{ fill: "#333" }} />
                    <YAxis tick={{ fill: "#333" }} />
                    <Tooltip />
                    <Legend />

                    {/* Stacked Bars using the proper shades of #FF6700 */}
                    <Bar dataKey="Cash" stackId="a" fill="#FF6700" />       {/* Main Orange */}
                    <Bar dataKey="UPI" stackId="a" fill="#FF7F27" />       {/* Slightly Brighter */}
                    <Bar dataKey="CreditCard" stackId="a" fill="#FF944D" /> {/* Soft Orange */}
                    <Bar dataKey="DebitCard" stackId="a" fill="#FFA366" />  {/* Light Orange */}
                    <Bar dataKey="Wallet" stackId="a" fill="#FFB380" />     {/* Lightest Orange */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentMethodChart;
