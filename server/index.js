const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const AuthRouter = require('./Router/authRouter')
const TecherRouter = require('./Router/techerRouter')
const QuizRouter = require('./Router/quizRouter')
const AssignmentRouter = require('./Router/assignmentRouter')

const app = express()
const PORT = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/auth', AuthRouter)
app.use('/api/teacher', TecherRouter)
app.use("/api/assignments", AssignmentRouter);
app.use("/api/quizzes", QuizRouter);

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
