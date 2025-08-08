// client/src/components/StudentNameEntry.jsx
import React, { useState } from 'react';
import './StudentNameEntry.css';

// It now receives an 'onNameSubmit' function as a prop
function StudentNameEntry({ onNameSubmit }) { 
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      // This is the crucial line that sends the name up to the App component
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="name-entry-container">
      <div className="name-entry-card">
        <div className="welcome-header">Intervue Poll</div>
        <h1>Let's Get Started</h1>
        <p>
          If you're a student, you'll be able to <strong>submit your answers</strong>, <br /> participate in live polls, and see how your responses compare with your classmates.
        </p>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="name-input">Enter your Name</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g. Rahul Bajaj"
          />
          <button type="submit" disabled={!name.trim()} className="btn-primary">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentNameEntry;