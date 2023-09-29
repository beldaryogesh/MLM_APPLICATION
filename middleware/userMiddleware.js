const { emailRegex, statusRegex } = require('../constant/validation');
let User = require('../model/UserModel');
let constant = require('../constant/constat');

const personal_details_2 = async function(req, res, next){
    try{
        if(!req.body){
            return res.status(200).json({error_code : 400, message : 'empty body..!'})
        }
        let {name, email, address, pincode, village, taluka, district, state} = req.body;
        if (!name) {
            return res.status(200).json({ error_code: 400, message: "please provide name..!" });
          }
          if (!email) {
            return res.status(200).json({ error_code: 400, message: "please provide email..!" });
          }
          if (!emailRegex.test(email)) {
            return res.status(200).json({ error_code: 400, message: "please provide valid email Id..!" });
          }
          if (!address) {
            return res.status(200).json({ error_code: 400, message: "please provide address..!" });
          }
          if (!address) {
            return res.status(200).json({ error_code: 400, message: "please provide address..!" });
          }
          if (!pincode) {
            return res.status(200).json({ error_code: 400, message: "please provide pincode..!" });
          }
          if (!village) {
            return res.status(200).json({ error_code: 400, message: "please provide village name..!" });
          }
          if (!taluka) {
            return res.status(200).json({ error_code: 400, message: "please provide taluka name..!" });
          }
          if (!district) {
            return res.status(200).json({ error_code: 400, message: "please provide district name..!" });
          }
          if (!state) {
            return res.status(200).json({ error_code: 400, message: "please provide state name..!" });
          } 
         next()
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside personal_details_2 middleware..!'})
    }
}

const identity_details = async function(req, res, next){
    try{
        let { panCardNumber, nameRegisteredAsGST, gstNumber } = req.body;
        if(!panCardNumber){
            return res.status(200).json({error_code : 400, message : 'please provide pan card number..!'})
        }
        if(!nameRegisteredAsGST){
            return res.status(200).json({error_code : 400, message : 'please provide registerd GST name..!'})
        }
        if(!gstNumber){
            return res.status(200).json({error_code : 400, message : 'please provide GST number..!'})
        }
        if(!req.files){
            return res.status(200).json({error_code : 400, message : 'please provide pancard image..!'})
        }
        next()
    }catch(error){
        console.log(error)
        return res.status(500).json({error_code : 500, message : 'error inside identity_details middleware..!'})
    }
}

const family_details = async function(req, res, next){
  try{
    let userId = req.userId;
    let user = await User.findById(userId);
    if(user.familyDetails.numberOfFamilyMembers == 0){
      return res.status(200).json({error_code : 400, message : 'please provide number of family members..!'})
    }
    if(!req.body.name){
      return res.status(200).json({error_code : 400, message : 'please provide name..!'})
    }
    if(!req.body.age){
      return res.status(200).json({error_code : 400, message : 'please provide age'})
    }
    next();
  }catch(error){
    console.log(error);
    return res.status(500).json({erro_code : 500, message : 'error inside family_details middleware..!'})
  }
}

const bank_details = async function(req, res, next){
  try{
    let { accountNumber, reEnterAccountNumber, beneficiaryName, bankName, ifscCode, accountType } = req.body;
    if(!accountNumber){
      return res.status(200).json({errro_code : 400, message : 'please provide account number..!'})
    }
    if(!reEnterAccountNumber){
      return res.status(200).json({errro_code : 400, message : 'please re-enter account number..!'})
    }
    if(accountNumber != reEnterAccountNumber){
      return res.status(200).json({error_code : 400, message : 'please check account number..!'})
    }
    if(!beneficiaryName){
      return res.status(200).json({errro_code : 400, message : 'please provide beneficiary name..!'})
    }
    if(!bankName){
      return res.status(200).json({errro_code : 400, message : 'please provide bank name..!'})
    }
    if(!ifscCode){
      return res.status(200).json({errro_code : 400, message : 'please provide ifscCode..!'})
    }
    if(!accountType){
      return res.status(200).json({errro_code : 400, message : 'please provide accountType..!'})
    }
    next()
  }catch(error){
    console.log(error);
    return res.status(500).json({error_code : 500, message : 'error inside bank_details middleware..!'})
  }
}

const payment_details = async function(req, res, next){
  try{
    let userId = req.userId;
    let user = await User.findById(userId);
    let { transactionId, amount, currency, status } = req.body;
    if(!transactionId){
      return res.status(200).json({error_code : 400, message : 'please provide transactionId..!'});
    }
    if(!amount){
      return res.status(200).json({error_code : 400, message : 'please provide amount..!'});
    }
    if(!currency){
      return res.status(200).json({error_code : 400, message : 'please provide currency..!'});
    }
    if(!status){
      return res.status(200).json({error_code : 400, message : 'please provide status..!'});
    }
    if(!statusRegex.test(status)){
      return res.status(200).json({error_code : 400, message : `status should be contain ${constant.success}, ${constant.failed}, ${constant.pending} only..!`});
    }
    next()
  }catch(error){
    console.log(error);
    return res.status(500).json({error_code : 500, message : 'error inside payment_details middleware..!'})
  }
}


module.exports = {
    personal_details_2,
    identity_details,
    family_details,
    bank_details,
    payment_details
}
