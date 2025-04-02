import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BsCheck, BsCheckAll } from "react-icons/bs"; // Read receipts icons

// Static Admins List (Replace with real-time fetching later)
const admins = [
  "MS Dhoni",
  "Rohit Sharma",
  "Virat Kohli",
  "Suresh Raina",
  "Jasprit Bumrah"
];

const Messages = () => {
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  // Uncomment the below code to fetch admins dynamically from backend
  /*
  useEffect(() => {
    fetch("http://localhost:8080/api/admins") // Replace with actual backend API
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error("Error fetching admins:", error));
  }, []);
  */

  useEffect(() => {
    // Uncomment to fetch real-time messages when an admin is selected
    /*
    if (selectedAdmin) {
      fetch(http://localhost:8080/api/messages?admin=${selectedAdmin})
        .then((response) => response.json())
        .then((data) => setMessages((prev) => ({ ...prev, [selectedAdmin]: data })))
        .catch((error) => console.error("Error fetching messages:", error));
    }
    */
  }, [selectedAdmin]);

  // When admin opens chat, mark only *their* messages as seen
  useEffect(() => {
    if (selectedAdmin && messages[selectedAdmin]) {
      setMessages((prev) => ({
        ...prev,
        [selectedAdmin]: prev[selectedAdmin].map((msg) =>
          msg.sender === "You" ? { ...msg, seen: true } : msg
        ),
      }));
    }
  }, [selectedAdmin]);

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleSendMessage = () => {
    if (input.trim() === "" || !selectedAdmin) return;

    const newMessage = {
      text: input,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), // Format: HH:mm
      seen: false, // Initially, the message is not seen by the admin
    };

    setMessages((prev) => ({
      ...prev,
      [selectedAdmin]: [...(prev[selectedAdmin] || []), newMessage],
    }));
    setInput("");

    // Uncomment to send message to backend in real-time
    /*
    fetch("http://localhost:8080/api/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin: selectedAdmin, message: newMessage }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Message sent successfully:", data))
      .catch((error) => console.error("Error sending message:", error));
    */
  };

  // Send message on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen mt-16">
      {/* Sidebar */}
      <div className={`w-full sm:w-1/4 bg-orange-500 text-white p-4 ${selectedAdmin ? "hidden sm:block" : "block"}`}>
        <h2 className="text-xl font-bold mb-4">Admins</h2>
        {admins.map((admin, index) => {
          // Get last message for each admin
          const lastMessage = messages[admin]?.length
            ? messages[admin][messages[admin].length - 1].text
            : "No messages yet";

          return (
            <div
              key={index}
              className="p-3 flex flex-col gap-1 cursor-pointer hover:bg-orange-600 rounded-lg"
              onClick={() => handleAdminClick(admin)}
            >
              <div className="flex items-center gap-2">
                <FaUserCircle size={24} />
                <span className="font-semibold">{admin}</span>
              </div>
              <p className="text-xs text-gray-200 truncate">{lastMessage}</p>
            </div>
          );
        })}
      </div>

      {/* Chat Window */}
      {selectedAdmin && (
        <div className="flex flex-col flex-1 bg-white shadow-lg">
          <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">{selectedAdmin}</h2>

            {/* Back button - Visible only on mobile screens */}
            <button className="sm:hidden text-sm" onClick={() => setSelectedAdmin(null)}>
              Back
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto h-[500px]">
            {(messages[selectedAdmin] || []).map((msg, i) => (
              <div
                key={i}
                className={`p-2 my-2 max-w-xs rounded-lg ${
                  msg.sender === "You" ? "bg-orange-400 text-white self-end ml-auto" : "bg-gray-200 text-black"
                }`}
              >
                <p>{msg.text}</p>
                <div className="flex justify-end items-center text-xs mt-1">
                  <span className="mr-1">{msg.time}</span>
                  {msg.sender === "You" && (
                    msg.seen ? <BsCheckAll className="text-blue-500" /> : <BsCheckAll className="text-gray-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress} // Enter key to send message
            />
            <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition" onClick={handleSendMessage}>
              <IoSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;