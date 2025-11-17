import React, { useCallback, useEffect } from 'react'
import { useState, useRef } from 'react';
import './Todo.css';

const Todo = () => {
       const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);


  const handleChange = (e) =>{
    setTask(e.target.value);
  } 

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, done: false, isEditing: false }]);
      setTask("");
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  };

  const handleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditToggle = (index) => {
    const updated = [...tasks];
    updated[index].isEditing = !updated[index].isEditing;
    setTasks(updated);
  };

  const handleEditChange = (e, index) => {
    const updated = [...tasks];
    updated[index].text = e.target.value;
    setTasks(updated);
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
            onChange={handleChange}
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
                      onChange={(e) => handleEditChange(e, index)}
                      autoFocus
                    />
                    <button 
                      className='btn-save'
                      onClick={() => handleEditToggle(index)}
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
                        onClick={() => handleEditToggle(index)}
                      >
                        Edit
                      </button>
                      <button 
                        className={`btn-done ${t.done ? 'undone' : ''}`}
                        onClick={() => handleDone(index)}
                      >
                        {t.done ? 'Undo' : 'Done'}
                      </button>
                      <button 
                        className='btn-delete'
                        onClick={() => handleDelete(index)}
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
