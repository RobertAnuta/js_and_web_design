const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Thing = require('./models/thing');

const app = express();
try {
    mongoose.connect("mongodb+srv://anutar:R%40bert123@cluster0.ptmajah.mongodb.net/")
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        });
} catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());




module.exports = app;