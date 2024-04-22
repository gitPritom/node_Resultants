// var _ = require('lodash');
// const note = require("./note.js");
// console.log("This is server side.");

// let age = note.age;
// console.log(age);

// let result = note.add(age + 10, 90);
// console.log(result);

// var data = ["pritom", "pritom", 1, 2, 4, 3, 90, "Polo", "polo"];
// var filter = _.uniq(data);
// console.log(filter);

// const jsonString = '{"name" : "Pritom Saha", "Age" : 23, "city" : "Kolkata"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.age);

// let fs = require('fs');
// fs.readFile('greeting.txt')

app.get('/chicken', (req, res) => {
    res.send('I would love to serve you chicken.');
});
app.get('/southIndia', (req, res) => {
    res.send("Welcome to South India.");
})

app.get('/menu',(req, res) => {
    let ourMenu = {
        menu1 : 'Biriyani',
        menu2 : 'Chicken koma',
        menu3 : 'mutton kosha',
        menu4 : 'butter chicken',
        menu5 : 'tandoori Chicken'
    }
    res.send(ourMenu);
});

app.post('/items', (req, res) => {
   res.send("Data is saved.");
});