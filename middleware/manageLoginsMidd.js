
const { adminTypeRegex, accessRegex, passRegex } = require('../constant/validation');
const adminConstant = require('../constant/adminConstant');

const manageLogins = async function(req, res, next){
    try{
        let { adminType, adminAccess } = req.body;
        if (!adminType) {
          return res.status(200).json({ error_code: 400, message: "please provide adminType..!" });
        }
        if (!adminTypeRegex.test(adminType)) {
          return res.status(200).json({ error_code: 400, message: `admin type should be contain ${adminConstant.typeAGM}, ${adminConstant.typeCEO}, ${adminConstant.typeGM} only..! ` });
        }
        if (!adminAccess) {
          return res.status(200).json({ error_code: 400, message: "please provide adminAccess..!" });
        }
      
        let access = adminAccess.replace(/\s+/g, "").split(",")
        let arr = [ adminConstant.accessDSM,adminConstant.accessSM, adminConstant.accessSrAccountant]
        let flag
        for (let i = 0; i < access.length; i++) {
          flag = arr.includes(access[i])
        }
        if (!flag) {
          return res.status(400).send({ status: false, data: "please provide DSM, SM, SR.Accountant..!", });
        }
        next() 
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside manageLogins in  manageLogin middleware..!'})
    }
}

const adminUpdateCheck = async function(req, res, next){
    try{
        let { adminType, adminAccess , password} = req.body;
        if(adminType != undefined){
            if (!adminType) {
              return res.status(200).json({ error_code: 400, message: "please provide adminType..!" });
            }
            if (!adminTypeRegex.test(adminType)) {
              return res.status(200).json({ error_code: 400, message: `admin type should be contain ${adminConstant.typeAGM}, ${adminConstant.typeCEO}, ${adminConstant.typeGM} only..! ` });
            }
        }
        if(adminAccess != undefined){
            if (!adminAccess) {
              return res.status(200).json({ error_code: 400, message: "please provide adminAccess..!" });
            }
            let access = adminAccess.replace(/\s+/g, "").split(",")
            let arr = [ adminConstant.accessDSM,adminConstant.accessSM, adminConstant.accessSrAccountant]
            let flag
            for (let i = 0; i < access.length; i++) {
              flag = arr.includes(access[i])
            }
            if (!flag) {
              return res.status(400).send({ status: false, data: "please provide DSM, SM, SR.Accountant..!", });
            }
        }
        if(password != undefined){
            if (!password) {
               return res.status(200).json({ error_code: 400, message: "please provide password..!" });
            }
            if (!passRegex.test(password)) {
               return res.status(200).json({error_code: 400, message: "please provide strong password.  useing special charectores..!"});
            }
        }
       next()
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside adminUpdateCheck in  manage login middleware..!'})
    }
}


module.exports = {
    manageLogins,
    adminUpdateCheck
}