const mongoose = require("mongoose");
const adminConstant = require('../constant/adminConstant');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    notification: [
      {
        message: String,
        time: Date,
      },
    ],
    adminType: {
      type: String,
    },
    adminAccess: {
      type: [{
        type:String,
        enum:[adminConstant.accessDSM, adminConstant.accessSM, adminConstant.accessSrAccountant]
    }],
    },
    status : {
      type : String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
