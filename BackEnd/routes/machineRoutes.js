const express = require('express');
const router = express.Router();
const WashingMachine = require('./../models/machine')

// POST Method to add a Menu Item
router.post('/', async (req, res) =>{
    try{
        const data = req.body
        const newMachineUser = new WashingMachine(data);
        const response = await newMachineUser.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// GET method to get the Menu Items
router.get('/', async (req, res) =>{
    try{
        const data = await WashingMachine.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async (req, res) =>{
    try {
        const extendTime = req.params.id; // Extract the machine ID from the URL parameter
        const machine = await WashingMachine.findOne(); // Find the machine by its ID
        

        if (!machine) {
            return res.status(404).json({message: 'Machine not found'});
        }

        // Assuming extendTime is in milliseconds, you might need to parse it to an integer
        const parsedExtendTime = parseInt(extendTime);

       

        machine.timeAtDelete += parsedExtendTime*600; // Extend the time

        await machine.save(); // Save the updated machine
        const queue=await WashingMachine.find();
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
})


router.delete('/', async (req, res) => {
    try{
        const response= await WashingMachine.findOneAndDelete(); // Find the first user of machine
        if (!response) {
            return res.status(404).json({ error: 'Machine User is not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Machine First User is Deleted Succesfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//Delete Any  Machine User by Its Name Is Done✅
/*router.delete('/:id',async (req,res)=>{
    try {
        let id= req.params.id;
        const deletedUser= await WashingMachine.deleteOne({userName:id});
        const previousUser= await WashingMachine.find().sort("timeAtAdded");
        if(!deletedUser) {
            return res.status(404).json({ message: "No user with that ID" })
          }
          
          // To set Time At Delete For Next User In Queue
          WashingMachine.updateMany(
              {},
              {$set:{
                   timeAtDelete : previousUser[previousUser.length -1].timeAtAdded
               }}
          )
    
          res.status(200).json(deletedUser)
      } catch (e) {
          res.status(500).json({ status: false , message: e.toString() })
      }
})
        
    } catch (err) {
        
    }
});*/

router.delete('/:id', async (req, res) => {
    try {
        const machineUserId = req.params.id;
        console.log(machineUserId + " this is id"); // Log the machine user ID
        
        // Find the machine user by its name
        const deletedUser = await WashingMachine.findOneAndDelete({ userName: machineUserId });

        if (!deletedUser) {
            return res.status(404).json({ error: 'Machine User not found' });
        }
        
        // Get all machine users
        const queue = await WashingMachine.find();
        let flag = false; // Flag to indicate if adjustments in queue are needed
        
        // Loop through the queue to update timeAtAdded and timeAtDelete for affected users
        for (let i = 0; i < queue.length; i++) {
            if (i === 0 && deletedUser.timeAtDelete === queue[0].timeAtAdded) {
                // Adjust timeAtAdded and timeAtDelete for the first user
                console.log("First User",queue[i]);
                queue[0].timeAtAdded = Date.now();
                queue[0].timeAtDelete = Date.now() + queue[0].time*120;
                console.log("YAha Par Aaye Ho Kya"); // Log a message if needed
                flag = true;
                console.log(queue[0]); // Log the updated data of
                await  queue[0].save();
                continue;
            }
            if (queue[i].timeAtDelete === deletedUser.timeAtAdded) {
                // Adjust timeAtAdded and timeAtDelete for subsequent users
                if (i !== queue.length - 1) {
                    queue[i + 1].timeAtAdded = deletedUser.timeAtAdded;
                    queue[i + 1].timeAtDelete = queue[i + 1].timeAtAdded + queue[i + 1].time;
                    flag = true;
                }
            }
            if (flag) {
                // Adjust timeAtAdded and timeAtDelete for all affected users
                queue[i].timeAtAdded = queue[i - 1].timeAtDelete;
                queue[i].timeAtDelete = queue[i - 1].timeAtDelete + queue[i].time;
            }
            await queue[i].save(); // Save the updated user in the queue
        }
        res.status(200).json({ message: 'Machine User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/*const deleteMachineQueueList = async (deletingUser) => {
    try {
      // Mark for deletion
      await User.deleteOne({ atTimeAdded: deletingUser.atTimeAdded });
  
      // Adjust times for subsequent users after deletion
      const previousUser = await User.findOne({ atTimeAdded: deletingUser.atTimeAdded });
      if (previousUser) {
        const newTimeDelete = previousUser.atTimeAdded + deletingUser.time * 120;
        await User.updateMany(
          { atTimeAdded: { $gt: deletingUser.atTimeAdded } },
          { $set: { atTimeDelete: newTimeDelete } }
        );
      }
  
      // Fetch the updated queue
      const newQueueList = await User.find();
      return newQueueList;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };*/

// comment added for testing purposes
module.exports = router;