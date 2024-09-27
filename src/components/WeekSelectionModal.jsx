import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addMealToWeek, setWeek } from "../store/mealSlice";

const WeekSelectionModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const { selectedMeals, meals } = useSelector((state) => state.meals);

  const handleAddMealsToWeek = (week) => {
    const selectedMealData = meals.filter((meal) =>
      selectedMeals.includes(meal.id)
    );
    dispatch(addMealToWeek({ week, meals: selectedMealData }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Select Week Modal"
      className="bg-white p-8 rounded-lg shadow-lg mx-auto mt-20 w-2/3"
    >
      <h2 className="text-2xl font-bold mb-6">Select a Week to Add Meals</h2>
      <div className="flex justify-around">
        {["week1", "week2", "week3", "week4"].map((week) => (
          <button
            key={week}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            onClick={() => handleAddMealsToWeek(week)}
          >
            {week.replace("week", "Week ")}
          </button>
        ))}
      </div>
      <button
        className="mt-8 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
        onClick={closeModal}
      >
        Save and Close
      </button>
    </Modal>
  );
};

export default WeekSelectionModal;
