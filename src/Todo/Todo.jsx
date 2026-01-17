import React from 'react'
import { useState, useRef } from 'react';
import './Todo.css';

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);

  // Helper function to create a new task object
  const createTask = (text) => ({
    text: text.trim(),
    done: false,
    isEditing: false,
  });

  // Handle input change
  const handleTaskInputChange = (event) => {
    setTask(event.target.value);
  };

  // Add a new task
  const addTask = () => {
    const trimmedTask = task.trim();
    if (trimmedTask) {
      setTasks((prevTasks) => [...prevTasks, createTask(trimmedTask)]);
      setTask("");
      inputRef.current?.focus();
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Toggle edit mode for a task
  const toggleEditMode = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };

  // Handle edit input change
  const handleEditInputChange = (event, index) => {
    const newText = event.target.value;
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, text: newText } : task
      )
    );
  };


  return (
    <div className='todo-container'>
      <div className='todo-header'>
        <h2>✓ Todo App</h2>
        <p>Organize your tasks and boost productivity</p>
      </div>

      <div className='taskform'>
        <form>
          <label>Enter the Task:</label>
          <input
            ref={inputRef}
            type='text'
            value={task}
            onChange={handleTaskInputChange}
            onKeyDown={handleKeyDown}
            placeholder='Add a new task...'
          />
          <button type='button' onClick={addTask}>ADD TASK</button>
        </form>

        {tasks.length === 0 ? (
          <div className='empty-state'>
            <span>📝</span>
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <ul className='todo-list'>
            {tasks.map((t, index) => (
              <li key={index} className={t.done ? 'completed' : ''}>
                {t.isEditing ? (
                  <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      value={t.text}
                      onChange={(e) => handleEditInputChange(e, index)}
                      autoFocus
                    />
                    <button 
                      className='btn-save'
                      onClick={() => toggleEditMode(index)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <div className='task-content'>
                      <span className={`task-text ${t.done ? 'completed' : ''}`}>
                        {t.text}
                      </span>
                    </div>
                    <div className='task-actions'>
                      <button 
                        className='btn-edit'
                        onClick={() => toggleEditMode(index)}
                      >
                        Edit
                      </button>
                      <button 
                        className={`btn-done ${t.done ? 'undone' : ''}`}
                        onClick={() => toggleTaskCompletion(index)}
                      >
                        {t.done ? 'Undo' : 'Done'}
                      </button>
                      <button 
                        className='btn-delete'
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )

}
export default Todo;
