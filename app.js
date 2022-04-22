const express = require('express');

const app = express();

const loginRoutes = require('./routes/login');

app.use(express.json());

app.use('/api', loginRoutes);

app.listen(3000);
