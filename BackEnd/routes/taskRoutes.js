const express = require('express');
const router = express.Router();
const TaskDetail = require('./../models/task')

// POST Method to add a Menu Item ✅
router.post('/', async (req, res) =>{
    try{
        const data = req.body
        const newTask = new TaskDetail(data);
        const response = await newTask.save();
        console.log('New Task saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Taks'});
    }
})

router.post('/taskIsSolved',async (req,res)=>{
    try {
        const {status,taskId}=req.body;
        if (!taskId || !status) {
            return res.status(400).json({ message: "Missing fields!" });
          }
          
          let updatedTask = await TaskDetail.updateOne(
              { _id: taskId },
              { $set:{status: status} }
          );
  
          if (!updatedTask) {
              return res
                  .status(404)
                  .json({ message: "Taskt not found!" });
          }
  
          res.status(201).json({ message: "Taskt solved successfully!" });
          console.log("Task try to resolve");
      

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error!' });
    }
})
//Api ✅
router.get('/allTasks',async (req,res)=>{
    try{
        const data = await TaskDetail.find();
        console.log('All  Tasks fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error:Taks'});
    }
})
// GET method to get all public task
// GET method to get all private task
// router.get('/private', async (req, res) =>{
//     try{
//         const data = await TaskDetail.find({typeOfTaks:"Private"});
//         console.log('Private  Tasks fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error:Taks'});
//     }
// })
router.get('/taskHandler/:id', async (req, res) => {
    try {
        let taskHandlerId = req.params.id;
        const data = await TaskDetail.find({ reciverId: taskHandlerId }).populate({
            path: 'createrId',
            select: '-password' // Exclude 'password' field from createrId
        });
        if (data.length === 0)
            return res.status(404).json("No Data Found");
        else {
            res.status(200).json(data);
            console.log("Admin Fetched Task Data");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error: Failed to fetch tasks by admin ID' });
    }
});
router.get('/taskCreater/:id',async (req, res) =>{
    try{
        let taskCreaterId= req.params.id;
        const data=await TaskDetail.find({createrId:taskCreaterId}).populate({
            path:'reciverId',
            select:'-password'
        });
        if(!data) return res.status(404).json("No Data Found");
        else {
            res.status(200).json(data);
            console.log("Task Fetch by Creater Task Data");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err: 'Internal Server Error:Taks for feetch task by id of admin'});
    }
})
/*router.put('/:id', async (req, res) =>{
    try {
        const extendTime = req.params.id; // Extract the handeler ID from the URL parameter
        const machine = await TaskDetail.findOne(); // Find the machine by its ID
        

        if (!machine) {
            return res.status(404).json({message: 'Machine not found'});
        }

        // Assuming extendTime is in milliseconds, you might need to parse it to an integer
        const parsedExtendTime = parseInt(extendTime);

       

        machine.timeAtDelete += parsedExtendTime*600; // Extend the time

        await machine.save(); // Save the updated machine
        const queue=await TaskDetail.find();
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


// Unlike Functionality


router.delete('/:id', async (req, res) => {
    try{
        const deletingTaksId = req.params.id; // Extract the Taks ID from the URL parameter
        // const Taks = await TaskDetail.find({_id:deletingTaksId}); // Find the TaksPost by its ID
        const response= await TaskDetail.findByIdAndDelete(deletingTaksId); // Find the TaksPost by its ID
        if (!response) {
            return res.status(404).json({ error: 'Taks is Not Found' });
        }
        console.log('Taks is deleted');
        res.status(200).json({message: 'Delete ho gaya Task'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;