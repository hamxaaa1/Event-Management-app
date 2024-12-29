import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    navigate('/login');
  };

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: '',
    title: '',
    description: '',
    photo: null
  });
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos from the server
  const fetchTodos = async () => {
    const response = await fetch('https://backend-practice-eta.vercel.app/todos/getTodos');
    const data = await response.json();
    setTodos(data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create new todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newTodo.name);
    formData.append('title', newTodo.title);
    formData.append('description', newTodo.description);
    if (newTodo.photo) formData.append('photo', newTodo.photo);

    const response = await fetch('https://backend-practice-eta.vercel.app/todos/createTodo', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setNewTodo({
        name: '',
        title: '',
        description: '',
        photo: null
      });
      fetchTodos();
    } else {
      console.error('Error creating todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    const response = await fetch(`https://backend-practice-eta.vercel.app/todos/deleteTodo/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (data.success) {
      fetchTodos();
    } else {
      console.error('Error deleting todo');
    }
  };

  // Update todo
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', editingTodo.name);
    formData.append('title', editingTodo.title);
    formData.append('description', editingTodo.description);
    if (editingTodo.photo) formData.append('photo', editingTodo.photo);
  
    try {
      const response = await fetch(`https://backend-practice-eta.vercel.app/todos/updateTodo/${editingTodo._id}`, {
        method: 'PUT',
        body: formData,
      });
  
      const data = await response.json();
      if (data.success) {
        setEditingTodo(null);
        fetchTodos();  // reload the todos after update
      } else {
        console.error('Error updating todo:', data);
      }
    } catch (error) {
      console.error('Error while updating todo:', error);
    }
  };
  

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString(); // You can modify this format as needed
  };

  return (
    <div className="home-container">
      <h1>Welcome to Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>

      <div>
        <h1>Create Event</h1>
        
        {/* Create Todo Form */}
        <form onSubmit={handleCreateTodo}>
          <input
            type="text"
            placeholder="Name"
            value={newTodo.name}
            onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setNewTodo({ ...newTodo, photo: e.target.files[0] })}
          />
          <button type="submit">Create Event</button>
        </form>

        {/* Update Todo Form */}
        {editingTodo && (
          <form onSubmit={handleUpdateTodo}>
            <input
              type="text"
              placeholder="Name"
              value={editingTodo.name}
              onChange={(e) => setEditingTodo({ ...editingTodo, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              value={editingTodo.title}
              onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={editingTodo.description}
              onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setEditingTodo({ ...editingTodo, photo: e.target.files[0] })}
            />
            <button type="submit">Update Event</button>
          </form>
        )}

        {/* Todo List */}
        <h1>Events</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h3>{todo.name}</h3>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
              {todo.photo && <img src={`data:image/jpeg;base64,${todo.photo}`} alt="Todo Photo" />}
              <p>Created At: {formatDate(todo.createdAt)}</p>
              <p>Updated At: {formatDate(todo.updatedAt)}</p>
              <button onClick={() => handleEditTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
