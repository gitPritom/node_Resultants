const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Welcome to my hotel...');
});

//Import the router file for person.
const personRoutes = require('./routes/personRoutes');
//use the routers
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

app.listen(PORT, () =>{
    console.log("Our Server is running fine.");
});