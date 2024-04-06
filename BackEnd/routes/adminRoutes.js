const express = require('express');
const router = express.Router();

const { generateToken, jwtAuthMiddleware } = require('../jwt');
const complainDetail = require('../models/complain');
const Admin = require('../models/admin');
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await Admin.findOne({ email: email });
      console.log(existingUser);
      if (!existingUser) {
        return res.status(409).json({ error: "Admin is not Registered!" });
      }
      const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
      if (!isPasswordCorrect) {
        return res.status(403).json({ error: "Incorrect Password" });
      }
      const payload = {
        email: existingUser.email,
      };
  
      const token = generateToken(payload);
      // const jsonSendPayload={token,...payload}
      return res.json({
        token,
        user: existingUser.name,
        roomNo: existingUser.roomNo,
        id: existingUser._id,
        phoneNo: existingUser.phone,
      });
    } catch (err) {
      console.log("Error:", err);
    }
  });
  
  router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
      // Send the username and phone number in the response
      res.status(200).json({ message: "Admin Loggin Kiya Hai" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
router.post("/register", async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      const existingUser = await Admin.findOne({ name: name });
      if (existingUser) {
        console.log("Admin ALready registered");
        return res.status(409).json({ error: "Admin Already Exists" });
      }
      const newUser = new Admin({ name, phone, email, password });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.log("Error in register Admin:", err);
    }
  });
// POST Method to add a Menu Item
router.post('/', async (req, res) =>{
    try{
        const data = req.body
        const newAdmin = new Admin(data);
        const response = await newAdmin.save();
        console.log('New Admin saved');
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
        const data = await Admin.find();
        console.log('Admin fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

/*router.post("/login", async (req, res) => {
    try {
        const { userName, phoneNo } = req.body;
        const existingUser = await Admin.findOne({ userName: userName,phoneNo:phoneNo })  ;
        console.log(existingUser);
        if (!existingUser) {
            return res.status(409).json({ error: "Admin is not Registered!" });
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
        res.status(200).json({ userName , phoneNumber });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});*/
router.get('/complainToHandle/:id',async (req,res)=>{
    try {
        const handlerId=req.params.id;
        const complainDetails=await complainDetail.find({complainHandler:handlerId})
    
        if(!complainDetails){
            return res.status(404).json({message:"No Data Found"});
        }
        res.status(200).json(complainDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error!' });
    }
})
router.post('/complainIsSolved',async (req,res)=>{
    try {
        const {status,complainId}=req.body;
        if (!complainId || !status) {
            return res.status(400).json({ message: "Missing fields!" });
          }
          
          let updatedComplain = await complainDetail.updateOne(
              { _id: complainId },
              { $set:{status: status} }
          );
  
          if (!updatedComplain) {
              return res
                  .status(404)
                  .json({ message: "Complaint not found!" });
          }
  
          res.status(201).json({ message: "Complaint solved successfully!" });
          console.log("Complain try to resolve");
      

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error!' });
    }
})




/*router.put('/gardLoggedIn/:id', async (req, res) =>{
    try {
        const gardId = req.params.id; // Extract the gard ID from the URL parameter
        const gard = await Admin.findById(gardId); // Find the machine by its ID
        
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
})*/
/*
router.put('/gardLoggedOut/:id', async (req, res) =>{
    try {
        const gardId = req.params.id; // Extract the gard ID from the URL parameter
        const gard = await Admin.findById(gardId); // Find the machine by its ID
        

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
})*/

// comment added for testing purposes
module.exports = router;