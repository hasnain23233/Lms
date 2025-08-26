const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello from the server side!');
});

app.use('/api', (req, res, next) => {
    res.send('User route works fine');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});