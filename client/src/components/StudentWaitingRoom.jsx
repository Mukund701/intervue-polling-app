// client/src/components/StudentWaitingRoom.jsx
import React, { useState } from 'react';
import './StudentWaitingRoom.css';
import ParticipantsPopup from './ParticipantsPopup';

// Component now accepts the 'students' prop
function StudentWaitingRoom({ students }) {
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <div className="waiting-room-container">
      <div className="waiting-room-content">
        <div className="welcome-header">Intervue Poll</div>
        <div className="loader"></div>
        <p>Wait for the teacher to ask questions..</p>
      </div>

      {/* Conditionally render the popup */}
      {showParticipants && <ParticipantsPopup students={students} onClose={() => setShowParticipants(false)} />}
      
      {/* This button now opens the popup and uses the SVG icon */}
      <button className="chat-button" onClick={() => setShowParticipants(true)}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
}

export default StudentWaitingRoom;