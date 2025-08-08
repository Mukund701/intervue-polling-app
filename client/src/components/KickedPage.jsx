// client/src/components/KickedPage.jsx
import React from 'react';
import './KickedPage.css'; // Import the new CSS file

function KickedPage() {
  return (
    <div className="kicked-container">
      <div className="kicked-content">
        <div className="welcome-header">Intervue Poll</div>
        <h1>You've been Kicked out !</h1>
        <p>Looks like the teacher has removed you from the poll system. Please Try again sometime.</p>
      </div>
    </div>
  );
}

export default KickedPage;