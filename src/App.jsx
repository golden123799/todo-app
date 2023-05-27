import { useEffect, useState } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import DeleteButton from "./DeleteButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function App() {
  const MySwal = withReactContent(Swal);
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    MySwal.fire({
      title: <p>Delete To-Do?</p>,
      text: "Are you sure you want to continue?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((currentTodos) => {
          return currentTodos.filter((todo) => todo.id !== id);
        });
      }
    });
  }

  function reorderTodo(reorderedTodos) {
    setTodos(reorderedTodos);
  }

  function deleteAllTodo() {
    if (todos.length === 0) {
      MySwal.fire({
        title: <p>Nothing to delete</p>,
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }

    MySwal.fire({
      title: <p>Delete All</p>,
      text: "Are you sure you want to continue?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos([]);
      }
    });
  }

  function deleteCompletedTodo() {
    const hasCompletedTodos = todos.some((todo) => todo.completed === true);

    if (!hasCompletedTodos) {
      MySwal.fire({
        title: <p>Nothing to delete</p>,
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }

    MySwal.fire({
      title: <p>Delete Completed?</p>,
      text: "Are you sure you want to continue?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((currentTodos) => {
          return currentTodos.filter((todo) => !todo.completed);
        });
      }
    });
  }

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Your To-Do List
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <NewTodoForm onSubmit={addTodo} />

          <div className="flex items-center justify-center my-4">
            <span className="mr-2">
              <DeleteButton text="Delete All" onClick={() => deleteAllTodo()} />
            </span>

            <DeleteButton
              text="Delete Completed"
              onClick={() => deleteCompletedTodo()}
            />
          </div>
        </div>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          reorderTodo={reorderTodo}
        />
      </div>
    </>
  );
}
