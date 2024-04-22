const mongoose = require('mongoose');

// define MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/Resultants'

//Set up mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

//Get  the default connection 
//Mongoose maintains a default  connection object  representing the MongoDB connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected on MongoDB Server.");
});

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB Disconnected");
});

module.exports = db;