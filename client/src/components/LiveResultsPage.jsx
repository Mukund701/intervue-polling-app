// client/src/components/LiveResultsPage.jsx
import React, { useState } from 'react';
import './LiveResultsPage.css';
import ParticipantsPopup from './ParticipantsPopup';

function LiveResultsPage({ poll, socket, userRole, students = [] }) {
  const [activeTab, setActiveTab] = useState('participants');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [studentToKick, setStudentToKick] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);

  const options = poll?.options || [];
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  const handleAskNewQuestion = () => { socket.emit('teacher:ask_new'); };
  
  const openKickConfirmModal = (student) => { setStudentToKick(student); };
  const closeKickConfirmModal = () => { setStudentToKick(null); };

  const handleConfirmKick = () => {
    if (studentToKick) {
      socket.emit('teacher:kick_student', { studentId: studentToKick.id });
      setStudentToKick(null);
    }
  };

  const handleChatButtonClick = () => {
    if (userRole === 'teacher') {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setShowParticipants(true);
    }
  };

  return (
    <div className="lr-page-container">
      <div className="lr-content-wrapper-grid">
        <div className="lr-main-content">
            <div className="lr-header">
              <span className="lr-title">Question</span>
              {userRole === 'teacher' && <button className="lr-history-btn">View Poll history</button>}
            </div>
            <div className="lr-card">
              <h2>{poll?.question}</h2>
              <div className="lr-options-list">
                {options.map((option, index) => {
                  const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
                  return (
                    <div key={option.id} className="lr-result-item">
                      <div className="lr-progress-bar" style={{ width: `${percentage}%` }}></div>
                      <div className="lr-result-content">
                          <div className="lr-result-label">
                              <span className="lr-option-number">{index + 1}</span>
                              <span className="lr-option-text">{option.text}</span>
                          </div>
                          <span className="lr-percentage-text">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
             {userRole === 'teacher' && (
                <button onClick={handleAskNewQuestion} className="btn-primary">
                  + Ask a new question
                </button>
            )}
            {userRole === 'student' && (
                <p className="lr-wait-message">Wait for the teacher to ask a new question..</p>
            )}
        </div>
        
        {userRole === 'teacher' && isSidebarOpen && (
          <aside className="lr-sidebar">
            <div className="lr-tabs">
              <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'active' : ''}>Chat</button>
              <button onClick={() => setActiveTab('participants')} className={activeTab === 'participants' ? 'active' : ''}>Participants</button>
            </div>
            <div className="lr-tab-content">
              {activeTab === 'participants' && (
                <ul className="participants-list">
                  <li className="list-header"><span>Name</span><span>Action</span></li>
                  {students.map(student => (
                    <li key={student.id}>
                      <span>{student.name}</span>
                      <button onClick={() => openKickConfirmModal(student)} className="kick-btn">Kick out</button>
                    </li>
                  ))}
                </ul>
              )}
               {activeTab === 'chat' && (
                  <div className="chat-placeholder">Chat functionality is a bonus feature.</div>
               )}
            </div>
          </aside>
        )}
      </div>

      {userRole === 'student' && showParticipants && <ParticipantsPopup students={students} onClose={() => setShowParticipants(false)} />}

      {studentToKick && (
        <div className="modal-overlay">
          <div className="kick-confirm-modal">
            <h3>Confirm Removal</h3>
            <p>Are you sure you want to remove <strong>{studentToKick.name}</strong> from the poll?</p>
            <div className="modal-actions">
              <button onClick={closeKickConfirmModal} className="modal-cancel-btn">Cancel</button>
              <button onClick={handleConfirmKick} className="modal-confirm-btn">Confirm Kick</button>
            </div>
          </div>
        </div>
      )}
      
       <button className="chat-button" onClick={handleChatButtonClick}>
        {/* The emoji is replaced with an SVG icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
       </button>
    </div>
  );
}

export default LiveResultsPage;