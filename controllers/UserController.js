const User = require("../model/UserModel");
const Otp = require("../model/otpModel");
const sendOtp = require("../constant/sendOtp");
const referralId = require("../constant/referralId");
const jwtToken = require("../constant/jwtToken");
const baseURL = require("../constant/baseURL");
const constat = require("../constant/constat");

const personal_details_1 = async function (req, res) {
  try {
    const otp = await sendOtp.sendOtp(req);
    let obj = {
      myReferralId: referralId.createReferralId(),
      number: req.body.number ? req.body.number : undefined,
      referralId : req.body.referralId ? req.body.referralId : undefined,
      otp: otp,
    };
    let user = await User.create(obj);
    const token = await jwtToken(user);
    res.setHeader("x-api-key", token);
    return res.status(200).json({ error_code: 200, message: "otp sent successfully..!", otp: otp, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_code: 500, message: "error inside register_1 api..!" });
  }
};

const verifyOtp = async function (req, res) {
  try {
    let userId = req.userId;
    let otp = req.body.otp;
    let user = await User.findById(userId);
    let number = user.number;
    const find_number_otp = await Otp.findOne({ number });
    if (!find_number_otp || find_number_otp.otp != otp) {
        return res.status(200).send({ error_code: 404, message: "Invalid OTP" });
    }
    return res.status(200).send({ error_code: 200, message: "OTP verification successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error_code: 500, message: error.message });
  }
};

const personal_details_2 = async function (req, res){
    try {
        let userId = req.userId;
        let {name, email, address, pincode, village, taluka, district, state} = req.body;
        let obj = {
            name : name,
            email: email,
            address : address,
            pincode : pincode,
            village : village,
            taluka : taluka,
            district : district,
            state : state
        }
       await User.findByIdAndUpdate({_id : userId}, {$set : obj}, {new : true})
       return res.status(200).json({error_code : 200, message : "submit"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside personal_details_2 api..!'})
    }
}

const identity_details = async function (req, res){
    try {
        let userId = req.userId;
        let baseUrl = baseURL.generateBaseUrl(req);
        let user = await User.findById(userId);
        user.identityDetails.panCardNumber = req.body.panCardNumber;
        user.identityDetails.panCardPhoto = baseUrl + "/uploads/" + req.files[0].filename;
        user.identityDetails.nameRegisteredAsGST = req.body.nameRegisteredAsGST;
        user.identityDetails.gstNumber = req.body.gstNumber;
        user.save()
        return res.status(200).json({error_code : 200, message : "submit"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside personal_details_2 api..!'})
    }
}

const family_details = async function(req, res){
  try{
    let userId = req.userId;
    const { numberOfFamilyMembers, name, age } = req.body;
    const user = await User.findById(userId);
    if(user.familyDetails.numberOfFamilyMembers != 0){
    user.familyDetails.numberOfFamilyMembers = numberOfFamilyMembers;
    }
     user.familyDetails.familyMembers.push({name, age} )
    await user.save();
    return res.status(200).json({error_code: 200, message: 'submit' });
  }catch(error){
    console.log(error);
    return res.status(500).json({error_code : 500, message : 'error inside falily details api..!'})
  }
}

const bank_details = async function(req, res){
  try {
    let userId = req.userId;
    let { accountNumber, reEnterAccountNumber, beneficiaryName, bankName, ifscCode, accountType } = req.body;
    let user = await User.findById(userId);

    user.bankDetails = {
      accountNumber,
      reEnterAccountNumber,
      beneficiaryName,
      bankName,
      ifscCode,
      accountType,
    };
    await user.save();

    return res.status(200).json({error_code : 200,  message: 'submit' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const payment_details = async function(req, res){
  try{
    let userId = req.userId;
    let user = await User.findById(userId);
    let { transactionId, amount, currency, status } = req.body;
    user.paymentDetails = {
      transactionId,
      amount,
      currency,
      status,
      timestamp : Date.now()
    };
    user.currentLevel = 1
    user.status = constat.Active
    await user.save();
    if(user.paymentDetails.status != constat.success){
      return res.status(200).json({error_code : 400, message : `payment is ${user.paymentDetails.status}`})
    }
    let L1 = await User.findOne({myReferralId : user.referralId})
    if(L1){
      L1.myTeam.L1.push({
        name : user.name,
      })
      L1.save()
    }
    let L2 = await User.findOne({referralId : user.myReferralId})
    if(L2){
      L2.myTeam.L2.push({
        name : user.name
      })
      L2.save();
      console.log(L2)
    }
    return res.status(200).json({error_code : 200,  message: 'continue' });

  }catch(error){
    console.log(error);
    return res.status(500).json({error_code : 500, message : 'error inside payment api...!'})
  }
}

const userLogin = async function(req, res){
  try{
    let user = await User.findOne({number : req.body.number})
    if(!user){
      res.status(200).json({error_code : 404, message : 'user not exist..!'})
    }
    const otp = await sendOtp.updateOtp(req);
    const token = await jwtToken(user);
    return res.status(200).json({error_code : 200, message : 'otp send successfully..!', otp : otp, token : token});
  }catch(error){
    console.log(error);
    return res.status(500).json({error_code : 500, message : 'error inside user login api in user constroller..!'})
  }
}

module.exports = {
  personal_details_1,
  verifyOtp,
  personal_details_2,
  identity_details,
  family_details,
  bank_details,
  payment_details,
  userLogin
};

