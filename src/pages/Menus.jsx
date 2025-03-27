import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/cuisines.css';
import Maharashtra from "../assets/Maharashtra.png";
import Punjab from "../assets/punjab.png";
import TamilNadu from "../assets/tamilnadu.png";
import WestBengal from "../assets/westBangal.png";
import Gujarat from "../assets/gujrat.png";

const states = [
    { id: 1, name: "Andhra Pradesh", image: Maharashtra },
    { id: 2, name: "Arunachal Pradesh", image: Punjab },
    { id: 3, name: "Assam", image: TamilNadu },
    { id: 4, name: "Bihar", image: WestBengal },
    { id: 5, name: "Chhattisgarh", image: Gujarat },
    { id: 6, name: "Goa", image: Maharashtra },
    { id: 7, name: "Gujarat", image: Gujarat },
    { id: 8, name: "Haryana", image: TamilNadu },
    { id: 9, name: "Himachal Pradesh", image: WestBengal },
    { id: 10, name: "Jharkhand", image: Gujarat },
    { id: 11, name: "Karnataka", image: Maharashtra },
    { id: 12, name: "Kerala", image: Punjab },
    { id: 13, name: "Madhya Pradesh", image: TamilNadu },
    { id: 14, name: "Maharashtra", image: Maharashtra },
    { id: 15, name: "Manipur", image: Gujarat },
    { id: 16, name: "Meghalaya", image: Maharashtra },
    { id: 17, name: "Mizoram", image: Punjab },
    { id: 18, name: "Nagaland", image: TamilNadu },
    { id: 19, name: "Odisha", image: WestBengal },
    { id: 20, name: "Punjab", image:  Punjab },
    { id: 21, name: "Rajasthan", image: Maharashtra },
    { id: 22, name: "Sikkim", image: Punjab },
    { id: 23, name: "Tamil Nadu", image: TamilNadu },
    { id: 24, name: "Telangana", image: WestBengal },
    { id: 25, name: "Tripura", image: Gujarat },
    { id: 26, name: "Uttar Pradesh", image: Maharashtra },
    { id: 27, name: "Uttarakhand", image: Punjab },
    { id: 28, name: "West Bengal", image: WestBengal },
];

const Menus = () => {
    const navigate = useNavigate();
    const scrollContainer = useRef(null);

    const handleStateClick = (stateName) => {
        const formattedStateName = stateName.toLowerCase().replace(/\s+/g, ""); // Remove spaces
        navigate(`/state/${formattedStateName}`);
     };

    const scroll = (direction) => {
        if (scrollContainer.current) {
            const scrollAmount = 220;
            scrollContainer.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="menus">
            <h1>Menus Page</h1>
            <img className="imgg" src="src/assets/background4.png" alt="img" />
            <h2 className="add">Explore popular cuisines</h2>
            <p className="addd">Discover the rich culinary heritage of India by exploring famous dishes from different states !!</p>

            <div className="cuisines">
                <h2>Select a State to Explore Its Famous Dishes</h2>
                <div className="scroll-container">
                    {/* Left Scroll Button */}
                    <button className="scroll-btn left" onClick={() => scroll("left")}>&#9665;</button>

                    {/* Scrollable States */}
                    <div className="state-grid" ref={scrollContainer}>
                        {states.map((state) => (
                            <div key={state.id} className="state-card" onClick={() => handleStateClick(state.name)}>
                                <img src={state.image} alt={state.name} className="state-img" />
                                <p className="state-name">{state.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    <button className="scroll-btn right" onClick={() => scroll("right")}>&#9655;</button>
                </div>
            </div>
        </div>
    );
};

export default Menus;
