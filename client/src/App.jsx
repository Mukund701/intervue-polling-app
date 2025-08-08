// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

import WelcomePage from './components/WelcomePage';
import StudentNameEntry from './components/StudentNameEntry';
import TeacherCreatePoll from './components/TeacherCreatePoll';
import StudentWaitingRoom from './components/StudentWaitingRoom';
import LiveResultsPage from './components/LiveResultsPage';
import StudentQuestionPage from './components/StudentQuestionPage';
import KickedPage from './components/KickedPage';

// This line is updated to be deployment-ready
const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000');

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');
  const [poll, setPoll] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [students, setStudents] = useState([]);
  const [isKicked, setIsKicked] = useState(false);

  useEffect(() => {
    socket.on('connect', () => { console.log('CLIENT: Connected to server'); });
    socket.on('server:new_question', (pollData) => {
      setPoll(pollData);
      setHasVoted(false);
    });
    socket.on('server:update_results', (data) => {
      setPoll(data.poll);
      if(data.students) setStudents(data.students);
    });
    socket.on('server:update_student_list', (updatedStudents) => {
      setStudents(updatedStudents);
    });
    socket.on('server:poll_cleared', () => {
      setPoll(null);
      setHasVoted(false);
    });
    socket.on('disconnect', (reason) => {
        if (reason !== 'io client disconnect') {
            setIsKicked(true);
        }
    });

    return () => {
      socket.off('connect');
      socket.off('server:new_question');
      socket.off('server:update_results');
      socket.off('server:update_student_list');
      socket.off('server:poll_cleared');
      socket.off('disconnect');
    };
  }, []);

  const handleRoleSelection = (role) => { setUserRole(role); };
  const handleNameSubmit = (name) => {
    setUserName(name);
    socket.emit('student:join', name);
  };
  const handleAnswerSubmit = (optionId) => {
    socket.emit('student:submit_answer', { optionId });
    setHasVoted(true);
  };

  const renderContent = () => {
    if (isKicked) return <KickedPage />;
    
    if (!userRole) {
      return <WelcomePage onContinue={handleRoleSelection} />;
    }

    if (userRole === 'student') {
      if (!userName) return <StudentNameEntry onNameSubmit={handleNameSubmit} />;
      if (!poll) return <StudentWaitingRoom students={students} />;
      if (hasVoted) return <LiveResultsPage poll={poll} userRole={userRole} socket={socket} students={students} />;
      return <StudentQuestionPage poll={poll} onAnswerSubmit={handleAnswerSubmit} students={students} />;
    }

    if (userRole === 'teacher') {
      if (!poll) return <TeacherCreatePoll socket={socket} />;
      return <LiveResultsPage poll={poll} userRole={userRole} socket={socket} students={students} />;
    }
  };
  
  return <div className="App">{renderContent()}</div>;
}

export default App;