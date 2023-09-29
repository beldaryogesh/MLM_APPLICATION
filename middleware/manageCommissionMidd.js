
const checkLevelBody = async function(req, res, next){
    try{
        let { levelName, minimumUser, L1Commission, L2Commission, downlineReferralCommission } = req.body
        if(!levelName){
            return res.status(200).json({error_code : 400, message : 'please provide level name..!'})
        }
        if(!minimumUser){
            return res.status(200).json({error_code : 400, message : 'please provide minimum user..!'})
        }
        next()
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside check level body in manageCommissionMidd'})
    }
}

const updateLevelMidd = async function(req, res, next){
    try {
        let { levelName, minimumUser, L1Commission, L2Commission, downlineReferralCommission } = req.body
        if(levelName != undefined){
            if(!levelName){
                return res.status(200).json({error_code : 400, message : 'please provide level name..!'})
            }
        }
        if(minimumUser != undefined){
            if(!minimumUser){
                return res.status(200).json({error_code : 400, message : 'please provide level name..!'})
            }
        }
        if(L1Commission != undefined){
            if(!L1Commission){
                return res.status(200).json({error_code : 400, message : 'please provide L1Commission..!'})
            }
        }
        if(L2Commission != undefined){
            if(!L2Commission){
                return res.status(200).json({error_code : 400, message : 'please provide L2Commission..!'})
            }
        }
        if(downlineReferralCommission != undefined){
            if(!downlineReferralCommission){
                return res.status(200).json({error_code : 400, message : 'please provide Downline Referral Commission..!'})
            }
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside check level body in manageCommissionMidd'})
    }
}


module.exports = {
    checkLevelBody,
    updateLevelMidd
}