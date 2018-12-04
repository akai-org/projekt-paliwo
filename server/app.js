const path = require('path');

const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');

const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const app = express();

//mongoose.connect('mongodb://localhost/test');

app.use(userRoutes);
app.use(registerRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>ERROR PAGE</h1>');
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ a: 1 }));
});

app.listen(3000);

