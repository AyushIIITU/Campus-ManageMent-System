const express = require('express');
const router = express.Router();
const ComplainDetail = require('./../models/complain')

// POST Method to add a Menu Item
router.post('/', async (req, res) =>{
    try{
        const data = req.body
        const newComplain = new ComplainDetail(data);
        const response = await newComplain.save();
        console.log('Complain saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Complain'});
    }
})
router.post('/updateStatus', async (req, res) =>{
    try{
        const data = req.body;
        
        const idOfDeletion=data._id; // admin can update the status of any complain but only for;
        const status=data.status;//Status Kya Hai?
        await ComplainDetail.findByIdAndUpdate(idOfDeletion, { $set : {"status" : status} });  // change the status 
        // const response = await newComplain.save();
        console.log('Complain saved');
        res.status(200).json({message:"Complain Resovle ho gayi hogi"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Complain'});
    }
})
router.get('/allComplain',async (req,res)=>{
    try{
        const data = await ComplainDetail.find();
        console.log('All  complains fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Complain'});
    }
})
// GET method to get all public complain
router.get('/public', async (req, res) =>{
    try{
        const data = await ComplainDetail.find({typeOfComplain:"Public"});
        console.log('Public  complains fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Complain'});
    }
})
// GET method to get all private complain
router.get('/private', async (req, res) =>{
    try{
        const data = await ComplainDetail.find({typeOfComplain:"Private"});
        console.log('Private  complains fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Complain'});
    }
})
router.get('/complainHandler/:id',async (req, res) =>{
    try{
        let complainHandlerId= req.params.id;
        const data=await ComplainDetail.find({complainHandler:complainHandlerId});
        if(!data) return res.status(404).json("No Data Found");
        else {
            res.status(200).json(data);
            console.log("Admin Fetch Data");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error:Complain for feetch complain by id of admin'});
    }
})
/*router.put('/:id', async (req, res) =>{
    try {
        const extendTime = req.params.id; // Extract the handeler ID from the URL parameter
        const machine = await ComplainDetail.findOne(); // Find the machine by its ID
        

        if (!machine) {
            return res.status(404).json({message: 'Machine not found'});
        }

        // Assuming extendTime is in milliseconds, you might need to parse it to an integer
        const parsedExtendTime = parseInt(extendTime);

       

        machine.timeAtDelete += parsedExtendTime*600; // Extend the time

        await machine.save(); // Save the updated machine
        const queue=await ComplainDetail.find();
        for(let l=1;l<queue.length;l++){
            queue[l].timeAtAdded=queue[l-1].timeAtDelete;
            queue[l].timeAtDelete=queue[l-1].timeAtDelete+queue[l].time;
            await queue[l].save();
        }
        console.log('response updated');
        res.status(200).json({message: 'Machine time extended successfully', machine});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})*/
//Like Functionallty
router.post('/Liked', async (req, res) => {
    try {
        const body = req.body;
        const complainId = body.complainId;
        const studentId = body.studentId;
        const response = await ComplainDetail.findById({ _id: complainId });
        if (!response) {
            return res.status(404).json({ error: 'Complain is Not Found' });
        }
        if (response.likedBy.includes(studentId)) { 
            return res.status(409).json({ message: 'You have already Liked this Complain.' })
        }
        response.likedBy.push(studentId); 
        await response.save();
        res.status(201).json({ message: 'You Liked This Response Successfully', data: response });

    } catch (err) {
        console.error("Error in Liked", err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Unlike Functionality
router.post('/UnLiked', async (req, res) => {
    try {
        const body = req.body;
        const complainId = body.complainId;
        const studentId = body.studentId; 
        const response = await ComplainDetail.findById({ _id: complainId });
        if (!response) {
            return res.status(404).json({ error: 'Complain is Not Found' });
        }

        
        response.likedBy.pull(studentId); 
        await response.save();
        res.status(201).json({ message: 'You Unliked This Response Successfully', data: response }); 

    } catch (err) {
        console.error("Error in UnLiked", err.message); // Corrected log message
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deletingComplainId = req.params.id; // Extract the Complain ID from the URL parameter
        // const Complain = await ComplainDetail.find({_id:deletingComplainId}); // Find the ComplainPost by its ID
        const response= await ComplainDetail.findOneAndDelete({_id:deletingComplainId}); // Find the ComplainPost by its ID
        if (!response) {
            return res.status(404).json({ error: 'Complain is Not Found' });
        }
        console.log('Complain is deleted');
        res.status(200).json({message: 'Delete ho gaya compline'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;