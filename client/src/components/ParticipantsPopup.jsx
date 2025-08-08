// client/src/components/ParticipantsPopup.jsx
import React from 'react';
import './ParticipantsPopup.css';

function ParticipantsPopup({ students = [], onClose }) {
  return (
    <div className="pp-modal-overlay" onClick={onClose}>
      <div className="pp-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pp-header">
          {/* The participant count has been removed from the header */}
          <h3>Participants</h3>
          <button onClick={onClose} className="pp-close-btn">&times;</button>
        </div>
        <ul className="pp-participants-list">
          {/* A header for the list has been added */}
          <li className="pp-list-header">
            <span>Name</span>
          </li>
          {students.map(student => (
            <li key={student.id}>
              <span>{student.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ParticipantsPopup;