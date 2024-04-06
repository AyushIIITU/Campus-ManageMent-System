const express = require('express');
const router = express.Router();
const BusDetail = require('./../models/bus')

// POST Method to add a Bus User
router.post('/', async (req, res) =>{
    try{
        const data = req.body
        const newComplain = new BusDetail(data);
        const response = await newComplain.save();
        console.log('Bus User Added saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Bus'});
    }
})
router.get('/',async(req,res)=>{
    try {
        const allBusUser=await BusDetail.find();
        if(allBusUser.length === 0 ) res.status(404).json("No Data Found");
        else res.status(200).send(allBusUser);
    } catch (err) {
        console.log("Error in Getting Bus",err);
        res.status(500).json({error: 'Internal Server Error:Bus'});
    }
})
router.delete("/",async(req,res)=>{
    try {
        const response=await  BusDetail.deleteMany();
        if(!response) return res.status(404).json( "Delete Unsuccessful");
        res.status(200).json(response);
    } catch (err) {
        console.log("Error in deleting ",err);
        res.status(500).json({ error : "Server Error:Bus" });
    }
})

module.exports = router;