const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employee.model");
const joiValidation = require("../validation/employee.validation")

//@desc Create New employee
//@route POST /api/v1/employees
const createEmployee = asyncHandler(async (req, res) => {
  const {error, value} = joiValidation.validate(req.body);
  if(error){
    console.log(error)
      return res.status(422).send("Invalid input")
  }

 try {
  const employee = await Employee.create(req.body);
  return res.status(201).json(employee);
 } catch (error) {
   console.log(error);
 }

});
//@desc Get all employees
//@route GET /api/v1//employees
const getEmployees= asyncHandler(async(req, res) => {
  console.log("1")
  const employees = await Employee.find({})
                                                      
  if(!employees) {
    res.status(404).json({message: "No employees found"})
  }
  res.status(200).json({data: employees})
})


//@desc Get employee
//@route GET /api/v1/employee/:id
const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id)
  if(!employee) {
    res.status(404).json({message:"Employee does not exist"})
  }
  res.status(200).json({data:employee})
});

//@desc Update employee
//@route PUT /api/employee/:id
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("employee not found");
  }
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedEmployee);
});

//@desc Delete employee
//@route DELETE /api/v1/employee/:id
const deleteEmployee = asyncHandler(async (req, res) => {
  try{
  const employeeId = req.params.id;
    
    // Find the user containing the employee to be deleted
    const user = await User.findOne({ employees: employeeId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Remove the employee from the array
    user.employees.pull(employeeId);
    
    // Save the updated user
    await user.save();
    
    // Delete the employee
    await Employee.deleteOne({ _id: employeeId });
    
    return res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  } 
})

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
};
