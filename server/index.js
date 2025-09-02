const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const AuthRouter = require('./Router/authRouter')
const TecherRouter = require('./Router/techerRouter')
const QuizRouter = require('./Router/quizRouter')
const AssignmentRouter = require('./Router/assignmentRouter')

// studentRouters
const EnrollmentRouter = require("./Router/studentRouters/enrollmentRouter");
const StudentQuizRouter = require("./Router/studentRouters/studentQuizRouter");


const app = express()
const PORT = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())



app.use('/api/auth', AuthRouter)
app.use('/api/teacher', TecherRouter)
app.use("/api/assignment", AssignmentRouter);
app.use("/api/quizzes", QuizRouter);

// studentRouters
app.use("/api/enrollment", EnrollmentRouter);
app.use("/api/student/quizzes", StudentQuizRouter);


mongoose.connect(MONGO_URL, { dbName: 'Dorooing_LMG' })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Connected to the database');
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Sorry we could not connect to the database', err.message);
    });
