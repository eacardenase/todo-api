const express = require('express');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const loginRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/api', loginRoutes);

app.listen(port);
