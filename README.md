# Intervue.io - Live Polling System

This is a full-stack, real-time polling application built for the Intervue.io SDE Intern assignment. The application allows a "Teacher" to create polls and manage a session, and "Students" to join, vote, and see live results.

**Live Application Link:** [https://musical-douhua-64f7c7.netlify.app](https://musical-douhua-64f7c7.netlify.app)

---

## Core Features Implemented

- **Real-Time Communication:** Built with Socket.IO for instant updates between all clients and the server.
- **Dual Personas:** Separate, functional user interfaces for both Teacher and Student roles.
- **Poll Management (Teacher):** Teachers can create new polls with multiple-choice options, set a time limit, and define a correct answer.
- **Live Voting (Student):** Students see questions as they are asked, can cast their vote, and see results after voting.
- **Live Results:** Both the Teacher and all Students see the results update in real-time as votes come in.
- **Session Reset:** The Teacher can clear a poll to ask a new question, resetting the state for all participants.

## "Good to Have" Features Implemented
- **Remove a Student:** The teacher has a participants list and can remove a student from the session.
- **Custom Confirmation Modal:** A custom UI pop-up was built to confirm the "Kick out" action, replacing the default browser alert.
- **Participant List:** Students and Teachers can view a list of all participants currently in the session.

## Tech Stack

- **Frontend:** React (Vite), JavaScript (ES6+), CSS3
- **Backend:** Node.js, Express
- **Real-Time Engine:** Socket.IO
- **Deployment:**
  - Frontend deployed on **Netlify**.
  - Backend deployed on **Render**.
