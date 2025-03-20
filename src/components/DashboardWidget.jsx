import React from 'react';
import '../styles/DashboardWidget.css';

const DashboardWidget = ({ title, value, icon, color }) => {
    return (
        <div className="dashboard-widget">
            <div className="widget-icon">{icon}</div>
            <div className="widget-content">
                <h3>{title}</h3>
                <p>{value}</p>
            </div>
        </div>
    );
};

export default DashboardWidget;
