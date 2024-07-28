import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [currentEdit, setCurrentEdit] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim() === '') {
      alert('Please enter a task!');
    } else {
      setTasks([...tasks, { text: taskInput, isEditing: false }]);
      setTaskInput('');
    }
  };

  const handleEditTask = (index) => {
    const modifiedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing: true } : task
    );
    setTasks(modifiedTasks);
    setCurrentEdit(tasks[index].text);
  };

  const handleSaveTask = (index) => {
    if (currentEdit.trim() === '') {
      handleDeleteTask(index);
    } else {
      const modifiedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: currentEdit, isEditing: false } : task
      );
      setTasks(modifiedTasks);
      setCurrentEdit('');
    }
  };

  const handleDeleteTask = (index) => {
    const modifiedTasks = tasks.filter((_, i) => i !== index);
    setTasks(modifiedTasks);
  };

  return (
    <div className='bg-secondary container w-75 d-flex flex-column align-items-center' style={{ borderRadius:'20px',minHeight: '100vh', paddingTop: '20px' }}>
      <h1 className='w-100 text-center' style={{ backgroundColor: 'aquamarine' }}>To-Do List</h1>
      <div className='d-flex mb-3' style={{ width: '50%', justifyContent: 'space-evenly' }}>
        <input
          className='form-control'
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className='btn btn-primary' onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className='list-group w-50'>
        {tasks.map((task, index) => (
          <li className='list-group-item d-flex justify-content-between align-items-center' key={index} style={{ marginBottom: '10px' }}>
            {task.isEditing ? (
              <>
                <input
                  className='form-control'
                  type="text"
                  value={currentEdit}
                  onChange={(e) => setCurrentEdit(e.target.value)}
                />
                <button className='btn btn-primary ml-2' onClick={() => handleSaveTask(index)}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <div>
                  <button className='btn btn-primary mr-2' onClick={() => handleEditTask(index)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handleDeleteTask(index)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
