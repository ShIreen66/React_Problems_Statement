import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

function App() {
  const [meals, setMeals] = useState(() => {
    const stored = localStorage.getItem("meals");
    return stored
      ? JSON.parse(stored)
      : { Breakfast: [], Lunch: [], Dinner: [] };
  });
  const [mealType, setMealType] = useState("Breakfast");
  const [foodItem, setFoodItem] = useState("");

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  const handleAdd = () => {
    if (!foodItem) {
      toast.error("Please enter a food item.");
      return;
    }
    setMeals((prev) => ({
      ...prev,
      [mealType]: [...prev[mealType], foodItem],
    }));
    setFoodItem("");
    toast.success("Food item added!");
  };

  const handleDelete = (type, index) => {
    setMeals((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
    toast.info("Food item deleted.");
  };

  const handleClearAll = () => {
    setMeals({ Breakfast: [], Lunch: [], Dinner: [] });
    toast.warn("All meals cleared!");
  };

  const today = new Date().toLocaleDateString();

  return (
    <div className="p-4 max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-2"> Meal Planner</h1>
      <p className="mb-2">Today's Date: {today}</p>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="p-2 border rounded"
        >
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          placeholder="Enter food item"
          className="p-2 border rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {mealTypes.map((type) => (
        <div key={type} className="mb-4">
          <h2 className="text-xl font-semibold mb-1">{type}</h2>
          <ul className="list-disc list-inside">
            {meals[type].map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item}</span>
                <button
                  onClick={() => handleDelete(type, index)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        onClick={handleClearAll}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Clear All
      </button>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
