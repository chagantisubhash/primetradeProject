import React from 'react';

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '0.5rem', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div>
        <button onClick={() => onEdit(task)} style={{ marginRight: '0.5rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', padding: '0.3rem 0.5rem', borderRadius: '3px' }}>Edit</button>
        <button onClick={() => onDelete(task.id)} style={{ backgroundColor: '#EF4444', color: '#fff', border: 'none', padding: '0.3rem 0.5rem', borderRadius: '3px' }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
