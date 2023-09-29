const Admin = require("../model/AdminModel");
const bcrypt = require("bcrypt");
const constant = require('../constant/constat');
const adminConstant = require('../constant/adminConstant');

const addAdmin = async function(req, res){
    try{
         let { adminType, email, adminAccess, name, number, password } = req.body;
         const encryptedPassword = await bcrypt.hash(password, 8);
         const obj = {
         name,
         number,
         email,
         password: encryptedPassword,
         adminType,
         };
         let access = adminAccess.replace(/\s+/g, "").split(",")
         obj['adminAccess'] = access;
        await Admin.create(obj)
         return res.status(200).json({error_code : 200, message : 'admin added successfully..!'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside addAdmin api in manageLogins controller..!'})
    }
}

const  getLogins = async function(req, res){
    try{
        let admin = await Admin.find({})
        let result = []
        let sr = 1
        for(let i=0; i<admin.length; i++){
            result.push({
                SrNo : sr++,
                JoinDate :	admin[i].createdAt,
                FullName : admin[i].name,
                EmailID : admin[i].email,
               	MobileNo : admin[i].number,
                AdminType : admin[i].adminType,
                Access : admin[i].adminAccess,
                Status : admin[i].status,
                adminId : admin[i]._id
            })
        }
        return res.status(200).json({error_code : 200, message : 'user list', result})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getLogins api in manageLogins controller..!'})
    }
}

const updateAdmin = async function(req, res){
    try{
        let adminId = req.body.adminId;
        let { adminType, email, adminAccess, name, number, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 8);
        let obj = {
          name : name ? name : undefined,
          adminType : adminType ? adminType : undefined,
          email : email ? email :undefined,
          number : number ? number : undefined,
          password : encryptedPassword ? encryptedPassword : undefined
        }
        if(adminAccess){
        let access = adminAccess.replace(/\s+/g, "").split(",")
          obj['adminAccess'] = access;
        }
        await Admin.findByIdAndUpdate({_id : adminId}, {$set : obj}, {new : true});

       return res.status(200).json({ error_code: 200, message: "admin update successfully..." });
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside updateAdmin api in manageLogins controller..!'})
    }
}

const serchLoginAdmin = async function (req, res) {
    try {
      const searchTerm = req.body.search;
      const admin = await Admin.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
          { adminType: searchTerm },
          { adminAccess: searchTerm },
        ],
      });
      let result = [];
      for(let i=0; i<admin.length; i++){
        result.push({
          JoinDate :	admin[i].createdAt,
          FullName : admin[i].name,
          EmailID : admin[i].email,
           MobileNo : admin[i].number,
          AdminType : admin[i].adminType,
          Access : admin[i].adminAccess,
          Status : admin[i].status,
          adminId : admin[i]._id
      })
      }
      if (admin.length === 0) { 
        return res.status(404).json({ error_code: 404, message: 'No users found..!' });
      }
      
      return res.status(200).json({ error_code: 200, result });      
    } catch (error) {
      console.error(error); 
      return res.status(500).json({ error_code: 500, message: 'Error inside serchLoginAdmin API in manageLogins controller..!'});
    }
  };
  

const deleteLoginAdmin = async function(req, res){
    try {
        const adminId = req.body.adminId;
        const deleteAdmin = await Admin.findByIdAndDelete(adminId);
        if (!deleteAdmin) {
          return res.status(200).json({ error_code : 400,  message: 'User not found.' });
        }
        res.status(200).json({error_code : 200,  message: 'Admin deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside deleteLoginAdmin api in manageLogins controller..!'})
    }
}

module.exports = {
    addAdmin,
    getLogins,
    updateAdmin,
    serchLoginAdmin,
    deleteLoginAdmin
};
