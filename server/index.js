// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();

// --- START OF CHANGES ---
// Explicitly define the URL of your live frontend application
const clientURL = "https://musical-douhua-64f7c7.netlify.app";

const corsOptions = {
  origin: clientURL,
  methods: ["GET", "POST"]
};

// Use the specific CORS options for both Express and Socket.IO
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});
// --- END OF CHANGES ---


const PORT = process.env.PORT || 4000;

let students = [];
let currentPoll = null;

io.on('connection', (socket) => {
  console.log(`SERVER: A new user has connected: ${socket.id}`);

  if (currentPoll) {
    socket.emit('server:update_results', { poll: currentPoll, students: students });
  } else {
    socket.emit('server:update_student_list', students);
  }

  socket.on('student:join', (name) => {
    const newStudent = { id: socket.id, name: name };
    students.push(newStudent);
    console.log(`SERVER: Student '${name}' has joined.`);
    io.emit('server:update_student_list', students);
  });

  socket.on('teacher:create_poll', (pollData) => {
    if (pollData && pollData.question && pollData.options) {
      currentPoll = {
        question: pollData.question,
        options: pollData.options.map(opt => ({...opt, votes: 0})),
        votes: {},
        timeLimit: pollData.timeLimit
      };
      io.emit('server:new_question', { 
        question: currentPoll.question, 
        options: currentPoll.options,
        timeLimit: currentPoll.timeLimit
      });
      io.emit('server:update_student_list', students);
    }
  });

  socket.on('student:submit_answer', ({ optionId }) => {
    if (currentPoll && currentPoll.votes[socket.id] === undefined) {
      const votedOption = currentPoll.options.find(opt => opt.id === optionId);
      if (votedOption) {
        votedOption.votes += 1;
        currentPoll.votes[socket.id] = optionId;
        io.emit('server:update_results', { poll: currentPoll, students: students });
      }
    }
  });

  socket.on('teacher:kick_student', ({ studentId }) => {
    const studentSocket = io.sockets.sockets.get(studentId);
    if (studentSocket) {
      studentSocket.disconnect(true);
    }
  });

  socket.on('teacher:ask_new', () => {
    currentPoll = null;
    io.emit('server:poll_cleared');
    console.log('SERVER: Poll cleared. Ready for new question.');
  });

  socket.on('disconnect', () => {
    const disconnectedStudent = students.find(student => student.id === socket.id);
    if (disconnectedStudent) {
      console.log(`SERVER: Student '${disconnectedStudent.name}' has disconnected.`);
      students = students.filter(student => student.id !== socket.id);
      io.emit('server:update_student_list', students);
    } else {
       console.log(`SERVER: A user (likely a teacher) has disconnected.`);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Polling Server is running!');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});