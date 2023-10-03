const express = require("express");
const { registerUser, getCurrentUser,loginUser, getAllUsers } = require("../controllers/user.controller");
const validateToken = require("../middlewares/token.handler");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentUser",validateToken, getCurrentUser);
router.get('/', getAllUsers);


module.exports = router;
