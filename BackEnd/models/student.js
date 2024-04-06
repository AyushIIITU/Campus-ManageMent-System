const mongoose=require('mongoose');
const bcrypt =require( 'bcrypt');


const studentSchema = new mongoose.Schema({
  name: {
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
  },
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    return next(err);
  }
});

studentSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// studentSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

const Student = new mongoose.model("Student", studentSchema);

module.exports= Student;
