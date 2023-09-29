const User = require('../model/UserModel');

const getUser = async function(req, res){
    try{
        let user = await User.find({})
        let result = []
        let sr = 1
        for(let i=0; i<user.length; i++){
            result.push({
                SrNo : sr++,
                ReferralID : user[i].referralId,
                JoinDate :	user[i].createdAt,
                FullName : user[i].name,
                EmailID : user[i].email,
               	MobileNo : user[i].number,
                CurrentLevel : user[i].currentLevel,
                TotalIncome : user[i].paymentDetails.amount,
                Status : user[i].status,
                userId : user[i]._id
            })
        }
        return res.status(200).json({error_code : 200, message : 'user list', result})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getUser api in user management controller..!'})
    }
}

const getPersonalDetails = async function(req, res){
    try{
        let userId = req.body.userId;
        let user = await User.findById(userId);
        let obj = {
            FullName : user.name,
            ReferralId : user.referralId,
            Email : user.email,
            Phone : user.number,
            Address : user.address,
            Village : user.village,
            Taluka : user.taluka,
            District : user.district,
            State : user.state,
            PinCode : user.pincode
        }
        return res.status(200).json({error_code : 200, obj})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getPersonalDetails api in user management controller..!'})
    }
}

const getIdentityProof = async function(req, res){
    try{
        let userId = req.body.userId;
        let user = await User.findById(userId);
        let obj = {
            NameAsGST : user.identityDetails.nameRegisteredAsGST ? user.identityDetails.nameRegisteredAsGST : undefined,
            GSTNo :  user.identityDetails.gstNumber ? user.identityDetails.gstNumber : undefined,
            PANNumber :  user.identityDetails.panCardNumber ? user.identityDetails.panCardNumber : undefined,
            PANCardImage :  user.identityDetails.panCardPhoto ? user.identityDetails.panCardPhoto : undefined

        }
        return res.status(200).json({error_code : 200, obj})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getIdentityProof api in user management controller..!'})
    }
}

const getBankDetails = async function(req, res){
    try{
        let userId = req.body.userId;
        let user = await User.findById(userId);
        let obj = {
            AccountHolderName : user.name ? user.name : undefined,
            BankName :  user.bankDetails.bankName ? user.bankDetails.bankName : undefined,
            AccountNo :  user.bankDetails.accountNumber ? user.bankDetails.accountNumber : undefined,
            IFSCCode :  user.bankDetails.ifscCode ? user.bankDetails.ifscCode : undefined,
            AccountType : user.bankDetails.AccountType ? user.bankDetails.AccountType : undefined
        }
        return res.status(200).json({error_code : 200, obj})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getBankDetails api in user management controller..!'})
    }
}


const getFamilyMembers = async function(req, res){
    try{
        let userId = req.body.userId;
        let user = await User.findById(userId);
        let familymembers = []
        for(let i=0; i<user.familyDetails.familyMembers.length; i++){
            familymembers.push(user.familyDetails.familyMembers[i])
        }
        return res.status(200).json({error_code : 200, familymembers})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getFamilyMembers api in user management controller..!'})
    }
}

const searchUser = async function(req, res){
    try{
        const searchTerm = req.body.search;
        const users = await User.find({
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
            { number: searchTerm },
            { referralId: searchTerm },
          ],
        });
        return res.status(200).json({error_code : 200, users})   
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside searchUser api in user management controller..!'})
    }
}


const deleteUser = async function(req, res){
    try{
        const userId = req.body.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(200).json({ error_code : 400,  message: 'User not found.' });
        }
        res.status(200).json({error_code : 200,  message: 'User deleted successfully' });
    
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside searchUser api in user management controller..!'})
    }
}


module.exports = {
    getUser,
    getPersonalDetails,
    getIdentityProof,
    getBankDetails,
    getFamilyMembers,
    searchUser,
    deleteUser
}