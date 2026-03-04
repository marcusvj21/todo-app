import { useState, useEffect } from 'react';
import todoApi from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = await todoApi.createTodo({ title: newTodo });
      setTodos([todo, ...todos]);
      setNewTodo('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      const updated = await todoApi.toggleTodo(id);
      setTodos(todos.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading todos...</div></div>;
  }

  return (
    <div className="container">
      <div className="todo-app">
        <h1>📝 Todo App</h1>
        
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleAddTodo} className="add-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty">No todos yet. Add one above!</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-title">{todo.title}</span>
                <button onClick={() => handleDelete(todo.id)} className="delete-btn">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        <div className="stats">
          {todos.length} {todos.length === 1 ? 'item' : 'items'} • 
          {todos.filter(t => !t.completed).length} active
        </div>
      </div>
    </div>
  );
}

export default App;
