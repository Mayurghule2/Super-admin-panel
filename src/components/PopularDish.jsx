import React from "react";
import DishCard from "../components/DishCard";
import kitchens from "../data/kitchensData";

function PopularDish({ kitchenId }) {
  const numericKitchenId = Number(kitchenId) || 0; // Ensures a valid number
  const selectedKitchen = kitchens.find(kitchen => kitchen.id === numericKitchenId);

  console.log("Kitchen ID:", kitchenId);
  console.log("Selected Kitchen:", selectedKitchen);

  // Sort dishes by rating (highest first)
  const sortedDishes = selectedKitchen?.dishes
    ? [...selectedKitchen.dishes].sort((a, b) => b.rating - a.rating)
    : [];

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {sortedDishes.length > 0 ? (
        sortedDishes.map(dish => <DishCard key={dish.id} dish={dish} />)
      ) : (
        <p className="text-center text-gray-500">No dishes available</p>
      )}
    </div>
  );
}

export default PopularDish;
