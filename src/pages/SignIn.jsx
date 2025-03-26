import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignIN.css'; // Add styles if needed

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        
        // Dummy authentication (Replace with real authentication logic)
        if (email === "admin@example.com" && password === "admin123") {
            localStorage.setItem("authToken", "some-random-token"); // Save auth token
            navigate("/"); // Redirect to Dashboard
        } else {
            alert("Invalid credentials! Try again.");
        }
    };

    return (
        <div className="signin-container">
            
            <form onSubmit={handleSignIn}>
            <h2>Sign In</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;
