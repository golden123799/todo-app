import DeleteButton from "./DeleteButton";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  reorderTodo,
}) {
  return (
    <ul className="list">
      {todos.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-6">
          <h1 className="text-2xl font-bold mb-4">No Tasks</h1>
          <p className="text-gray-500">There are no tasks to display.</p>
        </div>
      )}

      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          const reorderedItems = [...todos];
          const [removed] = reorderedItems.splice(result.source.index, 1);
          reorderedItems.splice(result.destination.index, 0, removed);

          reorderTodo(reorderedItems);
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      className="flex items-center pl-4 border border-gray-300 rounded-md mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <h4 {...provided.dragHandleProps}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                          />
                        </svg>
                      </h4>
                      <input
                        id={todo.id}
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                        name="bordered-checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 mr-2 my-4"
                      />
                      <label
                        htmlFor={todo.id}
                        className={`w-full py-4 ml-2 text-sm font-medium ${
                          todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {todo.title}
                      </label>

                      <DeleteButton onClick={() => deleteTodo(todo.id)} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ul>
  );
}
