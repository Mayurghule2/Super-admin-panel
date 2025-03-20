import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';
import '../styles/Charts.css';

const Charts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://api.example.com/chart-data') // Use your actual API
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="charts-container">
            <div className="chart-box">
                <h3>Pie Chart</h3>
                <PieChart width={200} height={200}>
                    <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#ff7f50">
                        <Cell fill="#ff7f50" />
                        <Cell fill="#facc15" />
                    </Pie>
                </PieChart>
            </div>
            <div className="chart-box">
                <h3>Line Chart</h3>
                <LineChart width={300} height={200} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ff7f50" />
                </LineChart>
            </div>
        </div>
    );
};

export default Charts;
