// client/src/components/StudentQuestionPage.jsx
import React, { useState, useEffect } from 'react';
import './StudentQuestionPage.css';
import ParticipantsPopup from './ParticipantsPopup';

function StudentQuestionPage({ poll, onAnswerSubmit, students }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(poll.timeLimit || 60);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onAnswerSubmit(selectedOptionId);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, onAnswerSubmit, selectedOptionId]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="sqp-container">
      <div className="sqp-content">
        <header className="sqp-header">
          <span>Question 1</span>
          <span className="sqp-timer">{formatTime()}</span>
        </header>
        <main className="sqp-card">
          <h2>{poll.question}</h2>
          <div className="sqp-options">
            {poll.options.map((option, index) => (
              <div
                key={option.id}
                className={`sqp-option ${selectedOptionId === option.id ? 'selected' : ''}`}
                onClick={() => setSelectedOptionId(option.id)}
              >
                <span className="sqp-option-number">{index + 1}</span>
                <span className="sqp-option-text">{option.text}</span>
              </div>
            ))}
          </div>
        </main>
        <footer className="sqp-footer">
          <button 
            className="sqp-submit-btn" 
            disabled={selectedOptionId === null} 
            onClick={() => onAnswerSubmit(selectedOptionId)}
          >
            Submit
          </button>
        </footer>
      </div>
      
      {showParticipants && <ParticipantsPopup students={students} onClose={() => setShowParticipants(false)} />}
      
      <button className="sqp-chat-button" onClick={() => setShowParticipants(true)}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
}

export default StudentQuestionPage;