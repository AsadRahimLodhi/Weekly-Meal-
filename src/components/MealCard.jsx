import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMealSelection } from "../store/mealSlice";

const MealCard = ({ meal }) => {
  const dispatch = useDispatch();
  const { selectedMeals } = useSelector((state) => state.meals);

  const isSelected = selectedMeals.includes(meal.id);

  const handleMealClick = () => {
    dispatch(toggleMealSelection(meal.id));
  };
  // Helper function to render stars based on the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? "text-[#184591]" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21 16.54 14.97 22 10.91l-9.19-.79L12 2 11.18 10.12 2 10.91l5.46 4.06L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };
  return (
    <div
      className={`bg-white border shadow-lg overflow-hidden cursor-pointer transition-all duration-300 p-8 rounded-lg ${
        isSelected ? "border-sky-500" : "border-gray-200"
      }`}
      onClick={handleMealClick}
    >
      <img
        className="w-full h-48 object-cover rounded-lg"
        src={meal.image}
        alt={meal.name}
      />
      <div className="p-4 bg-white">
        {/* <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-medium rounded">
          {meal.label}
        </span> */}
        <h3 className="mt-2 text-lg font-semibold ">{meal.name}</h3>
        {meal.instructions.map((ins) => (
          <p className="inline">{ins}</p>
        ))}

        <div className=" md:flex justify-between pt-2">
          <div>
            {" "}
            <p className="font-bold flex">
              {" "}
              Cuisine: <span className="font-normal">{meal.cuisine}</span>
            </p>
          </div>
          <div>
            {" "}
            <p className="font-bold flex">
              Rating:{" "}
              <span className="font-normal flex items-center ml-1">
                {renderStars(meal.rating)} {/* Render stars here */}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
