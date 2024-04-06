const express = require('express');
const router = express.Router();
const GardDetail = require('./../models/gard');
const { generateToken, jwtAuthMiddleware } = require('../jwt');

// POST Method to add a Menu Item
router.post('/', async (req, res) =>{
    try{
        const data = req.body
        const newGard = new GardDetail(data);
        const response = await newGard.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET method to get the Menu Items
router.get('/',jwtAuthMiddleware, async (req, res) =>{
    try{
        const data = await GardDetail.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
router.delete('/:id', async (req, res) => {
    try{
        const gardId = req.params.id; // Extract the User ID freom the URL parameter
        
        // Assuming you have a GardDetail model
        const response = await GardDetail.findByIdAndDelete(gardId);
        if (!response) {
            return res.status(404).json({ error: 'Gard is not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Gard is Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
router.post("/login", async (req, res) => {
    try {
        const { userName, phoneNo } = req.body;
        const existingUser = await GardDetail.findOne({ userName: userName,phoneNo:phoneNo })  ;
        console.log(existingUser);
        if (!existingUser) {
            return res.status(409).json({ error: "User is not Registered!" });
        }
        const payload={
            userName:existingUser.userName,
            phoneNo:existingUser.phoneNo,
        }
        
        const token = generateToken(payload);
        return res.json({ token });
    }
    catch (err) {
        console.log("Error:", err);
    }
});
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        // Extract user data from the request object
        const userData = req.user;
        
        // Extract username and phone number from the user data
        const userName = userData.userName;
        const phoneNumber = userData.phoneNo;

        // Send the username and phone number in the response
        res.status(200).json({ userName, phoneNumber });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/gardLoggedIn/:id', async (req, res) =>{
    try {
        const gardId = req.params.id; // Extract the gard ID from the URL parameter
        const gard = await GardDetail.findById(gardId); // Find the machine by its ID
        
        if (!gard) {
            return res.status(404).json({message: 'Gard is not found'});
        }

        // Assuming extendTime is in milliseconds, you might need to parse it to an integer
   

       

        gard.isLogged=true; // Extend the time
        await gard.save(); // Save the updated gard

        console.log('Gard Logged In');
        res.status(200).json({message: 'Gard Is Logged In successfully', gard});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
router.put('/gardLoggedOut/:id', async (req, res) =>{
    try {
        const gardId = req.params.id; // Extract the gard ID from the URL parameter
        const gard = await GardDetail.findById(gardId); // Find the machine by its ID
        

        if (!gard) {
            return res.status(404).json({message: 'Gard is not found'});
        }

        // Assuming extendTime is in milliseconds, you might need to parse it to an integer
   

       

        gard.isLogged=false; // Extend the time
        await gard.save(); // Save the updated gard

        console.log('Gard Logged Out');
        res.status(200).json({message: 'Machine time extended successfully', gard});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// comment added for testing purposes
module.exports = router;