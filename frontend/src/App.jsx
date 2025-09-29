import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = async (id, done) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    });
    const updated = await res.json();
    setTodos(todos.map(todo => (todo._id === id ? updated : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>

      {/* Input + Add button */}
      <div className="flex mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a todo"
          className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Todo list */}
      <ul className="space-y-3">
        {todos.map(todo => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
          >
            <span
              onClick={() => toggleTodo(todo._id, todo.done)}
              className={`flex-1 cursor-pointer ${
                todo.done ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500 hover:text-red-700 ml-3"
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
