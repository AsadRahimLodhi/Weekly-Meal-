import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meals: [],
  selectedWeek: "All Meals",
  weeklyMeals: {
    week1: [],
    week2: [],
    week3: [],
    week4: [],
  },
  addedMeals: [],
  selectedMeals: [], // Tracks meals selected by clicking on the card
};

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMeals(state, action) {
      console.log(state);
      state.meals = action.payload;
    },
    setWeek(state, action) {
      state.selectedWeek = action.payload;
    },
    toggleMealSelection(state, action) {
      const mealId = action.payload;
      if (state.selectedMeals.includes(mealId)) {
        state.selectedMeals = state.selectedMeals.filter((id) => id !== mealId);
      } else {
        state.selectedMeals.push(mealId);
      }
    },
    addMealToWeek(state, action) {
      const { week, meals } = action.payload;

      // Check if each meal already exists in any week
      const mealsToAdd = meals.filter((meal) => {
        // Check all weeks to see if this meal is already present
        const isAlreadyAdded = Object.values(state.weeklyMeals).some(
          (weekMeals) => weekMeals.some((item) => item.id === meal.id)
        );

        // Only include the meal if it's not already added in any week
        return !isAlreadyAdded;
      });

      // Push meals that passed the check to the specified week
      state.weeklyMeals[week].push(...mealsToAdd);

      // Update addedMeals array to include IDs of newly added meals
      state.addedMeals.push(...mealsToAdd.map((meal) => meal.id));
    },
    removeMealFromWeek(state, action) {
      const { week, mealId } = action.payload;
      state.weeklyMeals[week] = state.weeklyMeals[week].filter(
        (meal) => meal.id !== mealId
      );
      state.addedMeals = state.addedMeals.filter((id) => id !== mealId);
    },
  },
});

export const {
  setMeals,
  setWeek,
  toggleMealSelection,
  addMealToWeek,
  removeMealFromWeek,
} = mealSlice.actions;
export default mealSlice.reducer;
