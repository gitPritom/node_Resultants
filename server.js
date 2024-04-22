const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', function (req, res) {
  res.send('Welcome to my hotel...');
});

//Import the router file for person.
const personRoutes = require('./routes/personRoutes');
//use the routers
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);

app.listen(3000, () =>{
    console.log("Our Server is running fine.");
});