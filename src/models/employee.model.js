const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    jobRole: {
      type: String,
      required: true,
    },
  //  userId:{
  //    type:mongoose.Types.ObjectId,
  //    required:true,
  //    ref:"UserModel"
  //  },
    email: {
      type: String,
      required: true
    },
    wallet: {
      type: String,
      required: true
    },
    deducted: {
      type: Number,
    },
    bonus: {
      type: Number,
    },
    paid: {
      type: Number,
    },
    phone: {
      type: String,
      required: true
    },
    earned: {
      type: Number,
    },
    salary: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeModel", EmployeeSchema);
