const mongoose = require('mongoose');

const gardSchema = new mongoose.Schema({
    userName: { type: String, required: true }, // Gard Name who maintane
    phoneNo: { type: Number, unique: true, required: true },  // Phone number of the gard
    
})

const GardDetail = mongoose.model('gardData', gardSchema);

module.exports = GardDetail;