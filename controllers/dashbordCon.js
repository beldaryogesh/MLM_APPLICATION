const User = require('../model/UserModel');
const Admin = require('../model/AdminModel');
const adminConstant = require('../constant/adminConstant');
const constant = require('../constant/constat');
const totaleEmployees = async function(req, res){
    try {
        let employess = await Admin.find({});
        let totalEmployee = 0
        for(let i=0; i<employess.length; i++){
            if(employess[i].adminType != adminConstant.typeAdmin){
                totalEmployee++;
            }
        }
        return res.status(200).json({error_code : 200, totalEmployees : totalEmployee});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totalEmployees api in dasbord controller..!'})
    }
}

const totaleCEO = async function(req, res){
    try {
        let ceo = await Admin.find({});
        let totaleCeo = 0
        for(let i=0; i<ceo.length; i++){
            if(ceo[i].adminType == adminConstant.typeCEO ){
                totaleCeo++;
            }
        }
        return res.status(200).json({error_code : 200, totaleCEO : totaleCeo });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totaleCEO api in dasbord controller..!'})
    }
}


const totaleGM = async function(req, res){
    try {
        let gm = await Admin.find({});
        let totaleGm = 0
        for(let i=0; i<gm.length; i++){
            if(gm[i].adminType == adminConstant.typeGM ){
                totaleGm++;
            }
        }
        return res.status(200).json({error_code : 200, totaleGm : totaleGm });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totaleGM api in dasbord controller..!'})
    }
}

const totaleAGM = async function(req, res){
    try {
        let agm = await Admin.find({});
        let totaleAgm = 0
        for(let i=0; i<agm.length; i++){
            if(agm[i].adminType == adminConstant.typeAGM ){
                totaleAgm++;
            }
        }
        return res.status(200).json({error_code : 200, totaleAGM : totaleAgm });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totaleAGM api in dasbord controller..!'})
    }
}

const totaleDSM = async function(req, res){
    try {
        let employess = await Admin.find({});
        let totaldsm = employess.filter(employee => employee.adminAccess.includes(adminConstant.accessDSM)).length;
        return res.status(200).json({error_code : 200, toaleDSM : totaldsm})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totaleDSM api in dasbord controller..!'})
    }
}

const totaleSM = async function(req, res){
    try {
        let employess = await Admin.find({});
        let totalsm = employess.filter(employee => employee.adminAccess.includes(adminConstant.accessSM)).length;
        return res.status(200).json({error_code : 200, toaleSM : totalsm})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totaleSM api in dasbord controller..!'})
    }
}


const totaleSA = async function(req, res){
    try {
        let employess = await Admin.find({});
        let totalsa = employess.filter(employee => employee.adminAccess.includes(adminConstant.accessSrAccountant)).length;
        return res.status(200).json({error_code : 200, toaleSA : totalsa})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totaleSA api in dasbord controller..!'})
    }
}

const TotalRevenue = async function(req, res){
    try{
        let user = await User.find({});
        let revenue = 0
        for(let i=0; i<user.length; i++){
            if(user[i].paymentDetails.status == constant.success){
                revenue = revenue += user[i].paymentDetails.amount
            }
        }
        return res.status(200).json({error_code : 200, TotalRevenue : revenue})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside TotalRevenue api in dasbord controller..!'})
    }
}

const todayRevenue = async function(req, res){
    try{
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const todayRevenue = await User.aggregate([
          {
            $match: {
              'paymentDetails.timestamp': { $gte: today },
              'paymentDetails.status': 'success',
            },
          },
          {
            $group: {
              _id: null,
              totalAmount: { $sum: '$paymentDetails.amount' },
            },
          },
        ]);
        const todayTotalRevenue = todayRevenue[0]?.totalAmount || 0;
        return res.status(200).json({ error_code : 200, todayTotalRevenue });
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside todayRevenue api in dasbord controller..!'})
    }
}

const totalUser = async function(req, res){
    try {
        let user = await User.find({});
        return res.status(200).json({error_code : 200, totalUser : user.length})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside totalUser api in dasbord controller..!'})
    }
}

const todayUser = async function(req, res){
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const todayUsers = await User.find({ createdAt: { $gte: today } });
        return res.status(200).json({errror_code : 200, todayUsers : todayUsers.length});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside todayUser api in dasbord controller..!'})
    }
}

const level_1_User = async function (req, res){
    try {
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.one){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, levelOneUser : level});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside level_1_User api in dasbord controller..!'})
    }
}


const level_2_User = async function (req, res){
    try {
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.two){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, levelTwoUser : level});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside level_2_User api in dasbord controller..!'})
    }
}



const level_3_User = async function (req, res){
    try {
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.three){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, levelThreeUser : level});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside level_3_User api in dasbord controller..!'})
    }
}

const level_4_User = async function (req, res){
    try {
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.fore){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, levelForeUser : level});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside level_4_User api in dasbord controller..!'})
    }
}

const level_5_User = async function (req, res){
    try {
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.five){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, levelFiveUser : level});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside level_5_User api in dasbord controller..!'})
    }
}


const level_6_User = async function (req, res){
    try {
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.six){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, levelSixUser : level});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside level_6_User api in dasbord controller..!'})
    }
}

const crownUser = async function(req, res){
    try{
        let user = await User.find({});
        let level = 0
        for(let i=0; i<user.length; i++){
            if(user[i].currentLevel == constant.Crown){
                level++;
            }
        }
        return res.status(200).json({errror_code : 200, crownUser : level}); 

    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside crownUser api in dasbord controller..!'})
    }
}


module.exports = {
    totaleEmployees,
    totaleCEO,
    totaleGM,
    totaleAGM,
    totaleDSM,
    totaleSM,
    totaleSA,
    TotalRevenue,
    todayRevenue,
    totalUser,
    todayUser,
    level_1_User,
    level_2_User,
    level_3_User,
    level_4_User,
    level_5_User,
    level_6_User,
    crownUser
}





