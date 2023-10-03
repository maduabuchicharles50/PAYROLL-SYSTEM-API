const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const connectDb = require("./src/config/dbConnection");
const userRoutes = require('./src/routes/user.route')
const employeeRoutes = require('./src/routes/employee.route')
const fileRoutes = require("./src/routes/file.route")
const errorHandler = require('./src/middlewares/error.handler');
require("dotenv").config();

//connectDb();
const app = express();


//port
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.use(cors());
app.use(express.json({extended: false }));
app.use("/api/v1",employeeRoutes);
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/files', fileRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(` The Server running on port ${port}`);
});
