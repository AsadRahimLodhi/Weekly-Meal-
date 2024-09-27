import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMeals, setWeek } from "./store/mealSlice";
import MealCard from "./components/MealCard";
import WeekSelectionModal from "./components/WeekSelectionModal";

const App = () => {
  const dispatch = useDispatch();
  const { meals, selectedWeek, weeklyMeals } = useSelector(
    (state) => state.meals
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch meals data from the API
    const fetchMeals = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        dispatch(setMeals(response.data.recipes));
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };
    fetchMeals();
  }, [dispatch]);

  const handleWeekChange = (week) => {
    dispatch(setWeek(week));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-blue-50">
      {/* Header Section */}
      <header className="bg-cover bg-[url('https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] h-60 text-center py-12">
        <h1 className="text-4xl font-bold">Optimized Your Meal</h1>
        <p className="mt-2">
          Select Meal to Add in Week. You will be able to edit, modify, and
          change the Meal Weeks.
        </p>
      </header>

      {/* Main Section */}
      <section className="">
        {/* Tabs for Week Selection and Add to Week Button */}{" "}
        <h1 className="text-2xl font-bold md:ml-36 md:p-5">Week Orders</h1>
        <div className="border-b-2 flex flex-wrap justify-center md:justify-center items-center mb-8 bg-white">
          {/* Week Tabs */}

          <div className="flex flex-wrap justify-center md:space-x-28 md:p-7 font-bold">
            {["All Meals", "Week 1", "Week 2", "Week 3", "Week 4"].map(
              (week) => (
                <button
                  key={week}
                  className={`py-2 px-4 ${
                    selectedWeek === week
                      ? "text-blue-500 border-b-4 border-blue-500"
                      : "text-black"
                  }`}
                  onClick={() => handleWeekChange(week)}
                >
                  {week}
                </button>
              )
            )}
            {/* Add to Week Button */}
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <button
                className=" mt-4 md:mt-0 py-2 px-6 w-44 bg-[#184591] text-white hover:bg-blue-700 transition-colors duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                Add to Week
              </button>
            </div>
          </div>
        </div>
        {/* Meals Grid */}
        <div className="w-[80%] container mx-auto px-4 md:px-8 py-6">
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedWeek === "All Meals"
              ? meals.map((meal) => <MealCard key={meal.id} meal={meal} />)
              : weeklyMeals[`week${selectedWeek.split(" ")[1]}`].map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
          </div>
        </div>
        {/* Modal for Week Selection */}
        <WeekSelectionModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      </section>
    </div>
  );
};

export default App;
