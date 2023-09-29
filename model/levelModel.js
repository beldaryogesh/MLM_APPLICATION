const mongoose = require("mongoose");
const constat = require("../constant/constat");

const levelSchema = new mongoose.Schema(
  {
    levelName: {
      type: String,
      required: true,
    },
    minimumUser: {
      type: Number,
      required: true,
    },
    L1Commission: {
      type: Number,
      default: 0, // Default value can be changed as needed
    },
    L2Commission: {
      type: Number,
      default: 0, // Default value can be changed as needed
    },
    downlineReferralCommission: {
      type: Number,
      default: 0, // Default value can be changed as needed
    },
    status: {
      type: String,
      enum: [constat.Active, constat.Inactive],
      default: constat.Active,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Level", levelSchema);



/*
1) Level Name	
2) Minimum User
3) L1 Commission
4) L2 Commission
5) Downline Referral Commission
6) status
*/