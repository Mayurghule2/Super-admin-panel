import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/StateCuisines.css';
import Pavbhaji from "../assets/pavbhaji.png";
import Vadapav from "../assets/vadapav.png";
import Butterchicken from "../assets/butterchicken.png";
import Cholebhature from "../assets/cholebhature.png";
import Dosa from "../assets/dosa.png";
import Idli from "../assets/idli.png";
import Rasgulla from "../assets/Rasgulla.png";
import Mishtidoi from "../assets/mishtidoi.png";
import Dhokala from "../assets/dhokala.png";
import Thepla from "../assets/thepla.png";

// Sample dishes for each state
const stateDishes = {
    maharashtra: [
        { id: 1, name: "Pav Bhaji", image: Pavbhaji , calories: "400 kcal" },
        { id: 2, name: "Vada Pav", image: Vadapav , calories: "300 kcal" }
    ],
    punjab: [
        { id: 1, name: "Butter Chicken", image: Butterchicken , calories: "600 kcal" },
        { id: 2, name: "Chole Bhature", image: Cholebhature , calories: "550 kcal" }
    ],
    tamilnadu: [
        { id: 1, name: "Dosa", image: Dosa , calories: "350 kcal" },
        { id: 2, name: "Idli", image: Idli , calories: "150 kcal" }
    ],
    westbengal: [
        { id: 1, name: "Rasgulla", image : Rasgulla , calories: "250 kcal" },
        { id: 2, name: "Mishti Doi", image: Mishtidoi  , calories: "200 kcal" }
    ],
    gujarat: [
        { id: 1, name: "Dhokla", image: Dhokala , calories: "200 kcal" },
        { id: 2, name: "Thepla", image: Thepla , calories: "300 kcal" }
    ]
};

function StateCuisines() {
    const { stateName } = useParams();
    const navigate = useNavigate();
    const dishes = stateDishes[stateName] || [];

    return (
        <div className="state-cuisines">
            <h2>Famous Dishes of {stateName.charAt(0).toUpperCase() + stateName.slice(1)}</h2>
            <div className="dishes-grid">
                {dishes.length > 0 ? (
                    dishes.map((dish) => (
                        <div key={dish.id} className="dish-card">
                            <img src={dish.image} alt={dish.name} className="dish-img" />
                            <div className="dish-info">
                                <h3>{dish.name}</h3>
                                <p>Calories: {dish.calories}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No dishes found for this state.</p>
                )}
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

export default StateCuisines;
