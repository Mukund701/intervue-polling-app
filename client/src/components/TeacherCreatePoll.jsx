// client/src/components/TeacherCreatePoll.jsx
import React, { useState } from 'react';
import './TeacherCreatePoll.css';

// Component now accepts the socket connection as a prop
function TeacherCreatePoll({ socket }) { 
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: 1, text: '', isCorrect: false },
    { id: 2, text: '', isCorrect: false },
  ]);
  const [timeLimit, setTimeLimit] = useState(60);

  const handleAddOption = () => {
    if (options.length < 4) {
      const newId = options.length > 0 ? Math.max(...options.map(o => o.id)) + 1 : 1;
      setOptions([...options, { id: newId, text: '', isCorrect: false }]);
    }
  };

  const handleOptionTextChange = (id, text) => {
    setOptions(options.map(opt => (opt.id === id ? { ...opt, text } : opt)));
  };

  const handleSetCorrectOption = (id) => {
    setOptions(
      options.map(opt => ({ ...opt, isCorrect: opt.id === id }))
    );
  };

  const handleSetIncorrectOption = (id) => {
    setOptions(
        options.map(opt => (opt.id === id ? { ...opt, isCorrect: false } : opt))
    );
  };
  
  // This function now sends data to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    const pollData = { question, options, timeLimit };
    console.log('CLIENT: Teacher creating poll:', pollData);
    // Use the socket to emit a 'teacher:create_poll' event
    socket.emit('teacher:create_poll', pollData);
  };

  return (
    <div className="teacher-poll-container">
      <div className="poll-form-card">
        <div className="welcome-header">Intervue Poll</div>
        <h1>Let's Get Started</h1>
        <p>you'll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.</p>

        <form onSubmit={handleSubmit}>
          {/* ...The rest of the form JSX is exactly the same... */}
          <div className="form-group">
            <div className="question-header">
              <label htmlFor="question">Enter your question</label>
              <select 
                className="timer-dropdown" 
                value={timeLimit} 
                onChange={(e) => setTimeLimit(Number(e.target.value))}
              >
                <option value={30}>30 seconds</option>
                <option value={60}>60 seconds</option>
                <option value={90}>90 seconds</option>
              </select>
            </div>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="E.g. Which planet is known as the Red Planet?"
              maxLength="100"
            />
            <div className="char-counter">{question.length}/100</div>
          </div>
          <div className="form-group">
            <div className="options-header">
                <label>Edit Options</label>
                <label>Is it Correct?</label>
            </div>
            {options.map((option, index) => (
              <div key={option.id} className="option-row">
                <span className="option-number">{index + 1}</span>
                <input
                  type="text"
                  className="option-input"
                  value={option.text}
                  onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <div className="radio-group">
                    <input
                      type="radio"
                      id={`yes-${option.id}`}
                      name={`correct-option-${option.id}`}
                      checked={option.isCorrect}
                      onChange={() => handleSetCorrectOption(option.id)}
                    /> 
                    <label htmlFor={`yes-${option.id}`}>Yes</label>
                    <input
                      type="radio"
                      id={`no-${option.id}`}
                      name={`correct-option-${option.id}`}
                      checked={!option.isCorrect}
                      onChange={() => handleSetIncorrectOption(option.id)}
                    /> 
                    <label htmlFor={`no-${option.id}`}>No</label>
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddOption} className="add-option-btn">
              + Add More option
            </button>
          </div>
          <hr className="form-divider" />
          <button type="submit" className="ask-question-btn">
            Ask Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherCreatePoll;