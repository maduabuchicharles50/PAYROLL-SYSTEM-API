const express = require("express");
 const router = express.Router();
 const { getEmployees, createEmployee, getEmployee, updateEmployee, deleteEmployee} = require("../controllers/employee.controller");
//const validateToken = require("../middlewares/token.handler");
//router.use(validateToken);

//
router.get("/employees", getEmployees)
router.post("/", createEmployee)
router.get("/:id", getEmployee)
router.put("/:id", updateEmployee)
router.delete("/:id", deleteEmployee)

module.exports = router;