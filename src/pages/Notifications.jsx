import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import "../styles/Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // Fetch all notifications on page load
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/notifications") // Backend API
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  // WebSocket for real-time updates
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws/notifications");

    socket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Handle notification click - redirect and mark as read
  const handleNotificationClick = (id, link) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    if (link) {
      navigate(link); // Redirect to the relevant page
    }
  };

  return (
    <div className="notifications-page">
      {/* Header Section */}
      <div className="notifications-header">
        <div className="notifications-title"> Notifications</div>
        <div className="notifications-subtitle">Stay updated with the latest alerts!</div>
      </div>

      {/* Notification List */}
      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? "read" : "unread"}`}
              onClick={() => handleNotificationClick(notification.id, notification.link)}
            >
              <p>{notification.message}</p>
            </div>
          ))
        ) : (
          <p className="no-notifications"> No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
