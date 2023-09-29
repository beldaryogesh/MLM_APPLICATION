const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  referralId: {
    type: String,
  },
  number: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  village: {
    type: String,
  },
  taluka: {
    type: String,
  },
  district: {
    type: String,
  },
  state: {
    type: String,
  },
  identityDetails: {
    panCardNumber: String,
    panCardPhoto: String,
    nameRegisteredAsGST: String,
    gstNumber: String,
  },
  familyDetails: {
    numberOfFamilyMembers: Number,
    familyMembers: [
      {
        name: String,
        age: Number,
      },
    ],
  },
  bankDetails: {
    accountNumber: String,
    reEnterAccountNumber: String,
    beneficiaryName: String,
    bankName: String,
    ifscCode: String,
    accountType: String,
  },

  paymentDetails : {
    transactionId : String,
    amount : Number,
    currency : String,
    timestamp : Date,
    status: String
  },
  currentLevel : {
    type : String
  },
  status : {
    type : String
  } 

}, { timestamps: true }); 
module.exports = mongoose.model("User", userSchema);

/*
1) Personal Details
  - referral id
  - number
  - name
  - emailId
  - address
  - pincode
  - village
  - taluka
  - district
  - state
2) Identity section
  - pan card number
  - pan card photo
  - name registerd as gst
  - GST number
3) Family Details
  - number of family members
  - name 
  - age
4) Bank Details
  - add account number
  - re-enter account number
  - add beneficiary name
  - add bank name
  - add IFSC code
  - add Account type

5) payment 
  - transaction Id
  - amount
  - currency
  - timestamp
  - status
*/
