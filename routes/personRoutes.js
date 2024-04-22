const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//post route to add a person
router.post('/', async (req, res) => {
    try{
      const data = req.body //Asssuming the request body conatains the person data.
  
      //Create a new person document using mongoose model.
      const newPerson = new Person(data);
      // newPerson.name = data.name;
      // newPerson.age = data.age;
      // newPerson.work = data.work;
      // newPerson.mobile = data.mobile;
      // newPerson.email = data.email;
      // newPerson.address = data.address;
      // newPerson.salary = data.salary;
  
      //save the new Person in the database
      const respones = await newPerson.save();
      console.log('data is saved in database.');
      res.status(200).json(respones);
  
    }catch(err) { 
      console.log("Error:", err);
      res.status(500).json({Error: 'Internal server Error.'});
    }
  });

//GET method to get the person's data
router.get('/', async (req, res) => {
    try{
      const personData = await Person.find();
      console.log("Data is fatching...");
      res.status(200).json(personData);
    }catch(err){
      console.log("Error:", err);
      res.status(500).json({Error: 'Internal server Error.'});
    }
  });

//fetch People data according worktype.
router.get('/:workType', async (req, res) => {
    try{
    const workType = req.params.workType.toLowerCase(); //Extract the work type from the url parameter.
    if(workType === "chef" || workType === "mannager" || workType === "waiter"){
        const respones = await Person.find({ work: workType });
        console.log("Response Fetched...");
        res.status(200).json(respones);
    }else{
      res.status(404).json({error: 'Working Type not found.'})
    }
    }catch(err) {
      console.log("Error:", err);
      res.status(500).json({Error: 'Internal server Error.'});
    }    
});

//update data for a person
router.put('/:id', async (req, res) => {
    try{
        const personId = req.params.id; //fetching id from the database by using url parameter.
        const updatePersonSection = req.body; //updated data for the person who match the id.

        const respones = await Person.findByIdAndUpdate(personId, updatePersonSection, {
            new: true, //Return the Updated document.
            runValidators: true   //Run Mongoose Validation.
        });
        
        //if response is not find by the findByIdAndUpdate()
        if(!respones){ 
            res.status(404).json({ error: 'Person Not found in the database.'});
        }
        console.log("Data Updated.");
        res.status(200).json(respones);
    }catch(err){
        console.log("Error:", err);
        res.status(500).json({Error: 'Internal server Error.'});
    }
});

//Delete Person Data From the MongoDb Server.
router.delete('/:id', async(req, res) => {
  try{
    const deletedPersonId = req.params.id; //fetching data person'id from the URL parameter.
    const deleted = await Person.findByIdAndDelete(deletedPersonId);
    if(!deleted){
      res.status(404).json({ error: 'Person Not found in the database.'});
    }
    console.log("Data deleted.");
    res.status(200).json({Message: 'Person data deleted Successfully.'});
  }catch(err){
    console.log("Error:", err);
        res.status(500).json({Error: 'Internal server Error.'});
  }
});

module.exports = router;