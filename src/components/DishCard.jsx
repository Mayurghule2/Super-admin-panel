import React from "react";

const DishCard = ({ dish }) => {
  if (!dish) {
    return <p className="text-center text-red-500">Dish data not available</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64">
      {/* Ensure image URL exists */}
      {dish.image ? (
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-40 object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-2">{dish.name || "Unnamed Dish"}</h3>
      <p className="text-gray-600 text-sm font-medium">Price: ₹ {dish.price ?? "N/A"}</p>
      <p className="text-gray-600 text-sm">
        <p className="text-sm font-medium">
          Category:{" "}
          <span
            className={
              dish.category === "Veg"
                ? "text-green-600"
                : dish.category === "Non-Veg"
                  ? "text-red-600"
                  : "text-gray-600"
            }
          >
            {dish.category || "Unknown"}
          </span></p>
      </p>
      <p className="text-gray-600 text-sm">Rating: ⭐{dish.rating ?? "No rating"}</p>
      <div className="mt-3 flex items-center justify-between">
        {/* Best Seller on the Left (only if present) */}
        {dish.bestSeller ? (
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
            Best Seller
          </span>
        ) : (
          <span></span> // Empty span to maintain spacing
        )}

        {/* Available/Not Available on the Right */}
        <span className={`text-white text-xs px-2 py-1 rounded-md ${dish.isAvailable ? "bg-green-500" : "bg-red-500"}`}>
          {dish.isAvailable ? "Available" : "Not Available"}
        </span>
      </div>
    </div>
  );
};

export default DishCard;
