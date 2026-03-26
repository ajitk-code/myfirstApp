import { useState } from 'react';

export default function TodoList() {
  const initialTasks = [
    { id: 1, text: "Learn React" },
    { id: 2, text: "Practice Hooks" },
    { id: 3, text: "Understand Keys" },
    { id: 4, text: "Build Todo App" }
  ];
  
  const [tasks, setTasks] = useState(initialTasks);

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Todo List</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
            <span>{task.text}</span>
            <button 
              onClick={() => deleteTask(task.id)} 
              style={{ padding: '4px 8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p style={{ color: '#888', fontStyle: 'italic' }}>All tasks completed!</p>}
    </div>
  );
}
