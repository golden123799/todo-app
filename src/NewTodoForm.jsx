import { useState } from "react";

export default function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;
    onSubmit(newItem);

    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="item"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Add
      </label>
      <div className="relative">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add To-Do"
          required
        />
        <button className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
          Add
        </button>
      </div>
    </form>
  );
}
