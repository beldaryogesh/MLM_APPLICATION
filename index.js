const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const userManagementRoute = require('./routes/userMagagementRoute');
const manageLoginsRoute = require('./routes/manageLoginsRoute');
const dashbordRoute = require('./routes/dashbordRoute')
const manageCommissionRoute = require('./routes/manageCommissinRoute');
const productRoute = require('./routes/productRoute');
const app = express();

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://yogesh_beldar:Oh9CU4nZCayFGTeC@cluster0.zveoo.mongodb.net/MLM-APPLICATION"
    );
    console.log("mongoDB is connected..!");
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the directory where files will be uploaded
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });
app.use(upload.any());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((error, req, res, next) => {
  const message = `this is the Unexpected field --> ${error.field}`;
  return res.status(500).send(message);
});

app.use('/', adminRoute);
app.use('/', userRoute);
app.use('/', userManagementRoute);
app.use('/', manageLoginsRoute);
app.use('/', dashbordRoute);
app.use('/', manageCommissionRoute);
app.use('/', productRoute);

const PORT = 4200;

const start = () => {
  try {
    connectDb();
    app.listen(PORT, () => {
      console.log(`your express app is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
