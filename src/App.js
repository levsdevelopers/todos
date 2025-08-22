import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from "./todosSlice";
import { useState } from "react";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAdd = e => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">To-Do List</h2>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Новая задача"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Добавить
        </button>
      </form>

      <div className="flex justify-center gap-2 mb-6">
        <button 
          onClick={() => setFilter("all")} 
          className={`px-3 py-1 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Все
        </button>
        <button 
          onClick={() => setFilter("active")} 
          className={`px-3 py-1 rounded-lg ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Активные
        </button>
        <button 
          onClick={() => setFilter("completed")} 
          className={`px-3 py-1 rounded-lg ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Выполненные
        </button>
      </div>

      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li 
            key={todo.id} 
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="text-red-500 hover:text-red-700 transition"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
