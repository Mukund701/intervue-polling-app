// client/src/components/WelcomePage.jsx
import React, { useState } from 'react';
import './WelcomePage.css';

function WelcomePage({ onContinue }) {
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = () => {
    if (selectedRole) {
      onContinue(selectedRole);
    }
  };

  return (
    <div className="welcome-container">
        <div className="welcome-card">
            <div className="welcome-header">Intervue Poll</div>
            <h1>Welcome to the Live Polling System</h1>
            <p>Please select the role that best describes you to begin using the live polling system.</p>
            <div className="role-selector">
                <div 
                    className={`role-card ${selectedRole === 'student' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('student')}
                >
                    <h2>I'm a Student</h2>
                    <p>Join a session and submit answers to poll questions in real-time.</p>
                </div>
                <div 
                    className={`role-card ${selectedRole === 'teacher' ? 'selected' : ''}`}
                    onClick={() => setSelectedRole('teacher')}
                >
                    <h2>I'm a Teacher</h2>
                    <p>Create a new poll, ask questions, and view results in real-time.</p>
                </div>
            </div>
            {/* The className has been added to this button */}
            <button onClick={handleContinue} disabled={!selectedRole} className="btn-primary">
            Continue
            </button>
      </div>
    </div>
  );
}

export default WelcomePage;