const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const joiValidation = require("../validation/user.validation");

// //@desc Register a user
// //@route POST /api/users/register
// //@access public
const registerUser = asyncHandler(async (req, res) => {

  const {error, value} = joiValidation.validate(req.body);
  if(error){
    console.log(error)
      return res.status(422).send("Invalid input")
  }
  const userAvailable = await User.findOne({ email:req.body.email });
 
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //console.log("Hashed Password: ", hashedPassword);
  const user = await User.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    companyName:req.body.companyName,
    companyMail:req.body.companyMail,
    phoneNumber:req.body.phoneNumber,
    address:req.body.address,
    zipCode:req.body.zipCode,
    cacNumber:req.body.cacNumber,
    industry:req.body.industry,
    wallet:req.body.wallet,
    password: hashedPassword,
  });
  
  //console.log(`User created ${user}`);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400).json({error:"User data is not valid"});
  }
  res.json({ message: "register the user" });
});

// //@desc Login user
// //@route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
         //   id: user.id,
        },
      },
      process.env.SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken, user});
  } else {
    res.status(401).json("email or password is not valid");
  }
});

// //@desc Current user info
// //@route GET /api/users/current
const getCurrentUser = asyncHandler(async(req, res) => {
  const currentUser = req.currentUser;
  res.json(currentUser);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});



module.exports = { registerUser, loginUser, getCurrentUser , getAllUsers};
