const express = require('express');
const router = express.Router();
const Menu = require('./../models/Menu');

//POST method for add menu in menuItem.
router.post('/', async (req, res) => {
    try{
       const data = req.body;
       const newMenu = new Menu(data);
       const respones = await newMenu.save();
       console.log("Menu data is saved in database.");
       res.status(200).json(respones);
    }catch(err){
     console.log("Error:", err);
     res.status(500).json({Error: 'Internal server Error.'});
    }
 });

//Get method for Menu in resultants.
router.get('/', async (req, res) => {
    try{
      const menuData = await Menu.find();
      console.log("Menu data is fetched...");
      res.status(200).json(menuData);
    }catch(err){
      console.log("Error:", err);
      res.status(500).json({Error: 'Internal server Error.'});
    }
});

router.get('/:taste', async(req, res) => {
    try{
        const tasteType = req.params.taste.toLowerCase();
        if(tasteType === "sweet" ||  tasteType === 'spicy' || tasteType === 'sour' ){
              const respones = await Menu.find({ taste : tasteType});
              console.log('Respones Fetching....');
              res.status(200).json(respones);
        }else{
          res.status(404).json({Error: 'Internal Server Error.'});
        }
    }catch(err){
        console.log("Error:", err);
        res.status(500).json({Error: 'Internal Server Error.'});
    }
});

router.put('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const updateMenuSection = req.body;
        const respones = await Menu.findByIdAndUpdate(menuId, updateMenuSection, {
        new: true,
        runValidators: true
        });
        if(!respones){
            req.status(404).json({Error: 'Menu Item Not Found.'});
        }
        console.log('Data updated.');
        res.status(200).json(respones);
    }catch(err){
      console.log('Error:', err);
      res.status(500).json({Error: 'Internal Server Error.'});
    }
});

router.delete('/:id', async(req, res) => {
  try{
    const deletedMenuId = req.params.id; //fetching data menu'id from the URL parameter.
    const deleted = await Menu.findByIdAndDelete(deletedMenuId);
    if(!deleted){
      res.status(404).json({ error: 'Menu Not found in the database.'});
    }
    console.log("Data deleted.");
    res.status(200).json({Message: 'Menu data deleted Successfully.'});
  }catch(err){
    console.log("Error:", err);
        res.status(500).json({Error: 'Internal server Error.'});
  }
});

module.exports = router;