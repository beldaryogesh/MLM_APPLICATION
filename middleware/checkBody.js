const Admin = require("../model/AdminModel");
const bcrypt = require('bcrypt')
const { emailRegex, phoneRegex, passRegex } = require("../constant/validation");

const check_body = async function (req, res, next) {
  try {
    let { name, email, number, password } = req.body;
    if (!name) {
      return res.status(200).json({ error_code: 400, message: "please provide name..!" });
    }
    if (!email) {
      return res.status(200).json({ error_code: 400, message: "please provide email..!" });
    }
    if (!emailRegex.test(email)) {
      return res.status(200).json({ error_code: 400, message: "please provide valid email Id..!" });
    }
    if (!number) {
      return res.status(200).json({ error_code: 400, message: "please provide number..!" });
    }
    if (!phoneRegex.test(number)) {
      return res.status(200).json({error_code: 400,message: "please provide valid indian formate number..!"});
    }
    if (!password) {
      return res.status(200).json({ error_code: 400, message: "please provide password..!" });
    }
    if (!passRegex.test(password)) {
      return res.status(200).json({error_code: 400,message:"please provide strong password.  useing special charectores..!"});
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({error_code: 500,message: "error inside check_body middleware..!"});
  }
};

const login = async function (req, res, next) {
  try {
    if (!req.body.email) {
      return res.status(200).json({ error_code: 400, message: "please provide emial Id..!" });
    }
    if (!req.body.password) {
      return res.status(200).json({ error_code: 400, message: "please provide password..!" });
    }
    next()
  } catch (error) {
    console.log(error);
    return res.sttaus(500).json({ error_code: 500, message: "error inside login middleware..!" });
  }
};

const update = async function (req, res, next){
    try{
        let { name, email, number} = req.body;
        if(name != undefined){
            if (!name) {
              return res.status(200).json({ error_code: 400, message: "please provide name..!" });
            }
        }
        if(email != undefined){
            if (!email) {
              return res.status(200).json({ error_code: 400, message: "please provide email..!" });
            }
            if (!emailRegex.test(email)) {
              return res.status(200).json({ error_code: 400, message: "please provide valid email Id..!" });
            }
        }
        if(number != undefined){
            if (!number) {
              return res.status(200).json({ error_code: 400, message: "please provide number..!" });
            }
            if (!phoneRegex.test(number)) {
              return res.status(200).json({error_code: 400,message: "please provide valid indian formate number..!"});
            }
        }
        next()
    }catch(error){
        console.log(error);
        return res.sttaus(500).json({error_code : 500, message : 'error inside update middleware..!'})
    }
}

const password = async function(req, res, next){
    try{
        let adminId = req.userId;
        let admin = await Admin.findById(adminId);
        let {currentPassword, newPassword, confirmPassword} = req.body;
        if (!currentPassword) {
           return res.status(200).json({ error_code: 400, message: "please provide currentPassword..!" });
        }
        if (!newPassword) {
          return res.status(200).json({ error_code: 400, message: "please provide newPassword..!" });
        }
        if (!confirmPassword) {
          return res.status(200).json({ error_code: 400, message: "please provide confirmPassword..!" });
        }
        if (!passRegex.test(confirmPassword)) {
          return res
            .status(200).json({error_code: 400, message:"please provide strong password. useing Upppercase, numbers and special charectores..!"});
        }
        if (newPassword != confirmPassword) {
            return res.status(200).json({ error_code: 400, message: "new password and confirm password is Incorrect..!" });
        }
        const decrypPassword = admin.password;
        const pass = await bcrypt.compare(currentPassword, decrypPassword);
        if (!pass) {
          return res.status(400).json({ error_code: 400, message: "Incorrect current password..!" });
        }
        next()
    }catch(error){
        console.log(error)
        return res.status(500).json({error_code : 500, message : 'error inside password middleware..!'})
    }
}

module.exports = {
  check_body,
  login,
  update,
  password
};
