const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength:[3, "Name not long enough"],
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Name not long enough"],
      maxLength: 20,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true,'Email address is required'],
  },
    password: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required : true
    },
    companyMail:{
      type: String,
      required: true
    },
    phoneNumber: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    zipCode: {
      type:Number,
      required: true
    },
    cacNumber: {
      type: Number,
      required: true
    },
    industry: {
      type: String,
      required: true
    },
    wallet: {
      type: String,
      required: true
    },
    employees: [{
      type: mongoose.Types.ObjectId, 
      ref: "EmployeeModel", 
      required: true
  }],
  uploadedFiles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FileModel'
}],
},
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
