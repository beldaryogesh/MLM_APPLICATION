const Admin = require("../model/AdminModel");
const baseURL = require("../constant/baseURL");
const bcrypt = require("bcrypt");
const jwtToken = require("../constant/jwtToken");

const createAdmin = async function (req, res) {
  try {
    let baseUrl = baseURL.generateBaseUrl(req);
    const saltRounds = 8;
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let obj = {
      name: req.body.name ? req.body.name : undefined,
      number: req.body.number ? req.body.number : undefined,
      email: req.body.email ? req.body.email : undefined,
      password: encryptedPassword ? encryptedPassword : undefined,
      adminType : "Admin"
    };
    if (req.files.length > 0) {
      obj["profileImage"] = baseUrl + "/uploads/" + req.files[0].filename;
    }
    await Admin.create(obj);
    return res
      .status(200)
      .json({ error_code: 200, message: "admin created successfully..!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error_code: 500, message: "error inside create admin..!" });
  }
};

const admin_login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error_code: 400, message: "Invalid admin" })
    }
    const decrypPassword = admin.password;

    const pass = await bcrypt.compare(password, decrypPassword);
    if (!pass) {
      return res.status(400).json({ error_code: 400, message: "Password Incorrect" });
    }
    const token = jwtToken(admin);
    res.setHeader("x-api-key", token);
    {
      return res.status(201).json({
        error_code: 200,
        message: "admin login successfully",
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({ error_code: 500, message: error.message });
  }
};

const update_admin = async function (req, res) {
  try {
    let adminId = req.userId;
    let baseUrl = baseURL.generateBaseUrl(req);
    let admin = await Admin.findById(adminId);
    let obj = {
      name: req.body.name ? req.body.name : admin.name,
      number: req.body.number ? req.body.number : admin.number,
      email: req.body.email ? req.body.email : admin.email,
    };
    if (req.files.length > 0) {
      obj["profileImage"] = baseUrl + "/uploads/" + req.files[0].filename;
    }
    await Admin.findOneAndUpdate(
      { _id: adminId },
      { $set: obj },
      { new: true }
    );

    return res.status(200).json({
      error_code: 200,
      message: "admin update successfully...",
      obj,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_code: 500, message: error });
  }
};

const change_password = async function (req, res){
    try{
      let adminId = req.userId;
      const encryptedPassword = await bcrypt.hash(req.body.confirmPassword, 8);
      let obj = {
        password : encryptedPassword ? encryptedPassword : undefined
      }
      await Admin.findByIdAndUpdate(
        { _id: adminId },
        { $set: obj },
        { new: true }
      ); 
      return res.status(200).json({error_code : 200, message : 'password update successfully..!'})
    }catch(error){
        console.log(error)
        return res.status(500).json({error_code : 500, message : 'error inside change password'})
    }
}


module.exports = {
  createAdmin,
  admin_login,
  update_admin,
  change_password
};
