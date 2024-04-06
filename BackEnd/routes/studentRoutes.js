const express = require("express");
const router = express.Router();

const { generateToken, jwtAuthMiddleware } = require("../jwt");
const complainDetail = require("../models/complain");
const studentDetail = require("../models/student");

router.post("/register", async (req, res) => {
  try {
    const { name, phone, roomNo, email, password } = req.body;
    const existingUser = await studentDetail.findOne({ name: name });
    if (existingUser) {
      console.log("Student ALready registered");
      return res.status(409).json({ error: "Student Already Exists" });
    }
    const newUser = new studentDetail({ name, phone, roomNo, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error in register Student:", err);
  }
});
// POST Method to add a new student
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newStudent = new studentDetail(data);
    const response = await newStudent.save();
    console.log("New Student saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the Menu Items
router.get("/", async (req, res) => {
  try {
    const data = await studentDetail.find();
    console.log("All Student fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/*name: {
    type: String,
  },

  phone: {
    type: Number,
  },
  roomNo: {
    type: Number,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: "12345678",
  },*/

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await studentDetail.findOne({ email: email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(409).json({ error: "Student is not Registered!" });
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
    res.status(200).json({ message: "Student Loggin Kiya Hai" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/studentcomplainDetail/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    // console.log(studentId);
    const complainDetails = await complainDetail.find({ studentId: studentId });

    if (!complainDetails) {
      return res.status(404).json({ message: "No Data Found" });
    }
    console.log("Student  Complains Details fetched");
    res.status(200).json(complainDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error!" });
  }
});

/*router.put('/gardLoggedIn/:id', async (req, res) =>{
    try {
        const gardId = req.params.id; // Extract the gard ID from the URL parameter
        const gard = await complainDetail.findById(gardId); // Find the machine by its ID
        
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
        const gard = await complainDetail.findById(gardId); // Find the machine by its ID
        

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
