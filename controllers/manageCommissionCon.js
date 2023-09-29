const Level = require('../model/levelModel');

const createLevel = async function(req, res){
    try{
        let { levelName, minimumUser, L1Commission, L2Commission, downlineReferralCommission } = req.body
        let obj = {
            levelName : levelName ? levelName : undefined,
            minimumUser : minimumUser ? minimumUser : undefined,
            L1Commission : L1Commission ? L1Commission : undefined,
            L2Commission : L2Commission ? L2Commission : undefined,
            downlineReferralCommission : downlineReferralCommission ? downlineReferralCommission : undefined,
        }
        await Level.create(obj);
        return res.status(200).json({error_code : 200, message : 'level added successfully..!'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside createLevel api in manageCommission controller..!'})
    }
}

const getLevel = async function(req, res){
    try{
        let level = await Level.find({});
        let result = [];
        let sr = 1
        for(let i=0; i<level.length; i++){
            result.push({
                SrNo : sr++,
                LevelName : level[i].levelName ? level[i].levelName : undefined,
                MinimumUser	: level[i].minimumUser ? level[i].minimumUser : undefined,
                Status : level[i].status ? level[i].status : undefined,
                AllowCommisionAction : {
                    L1 : level[i].L1Commission,
                    L2 : level[i].L2Commission,
                    Downline : level[i].downlineReferralCommission
                },
                levelId : level[i]._id
            })
        }
        return res.status(200).json({error_code : 200, result})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside getLevel api in manageCommission controller..!'})
    }
}

const searchLevel = async function(req, res){
    try{
        const searchTerm = req.body.search;
        const level = await Level.find({ levelName : searchTerm });
        if(!level){
            return res.status(200).json({error_code : 404, message : 'level not found..!'})
        }
        let result = []
        let sr = 1
        for(let i=0; i<level.length; i++){
            result.push({
                SrNo : sr++,
                LevelName : level[i].levelName ? level[i].levelName : undefined,
                MinimumUser	: level[i].minimumUser ? level[i].minimumUser : undefined,
                Status : level[i].status ? level[i].status : undefined,
                AllowCommisionAction : {
                    L1 : level[i].L1Commission,
                    L2 : level[i].L2Commission,
                    Downline : level[i].downlineReferralCommission
                },
                levelId : level[i]._id
            })
        }
        return res.status(200).json({error_code : 200, result})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside searchLevel api in manageCommission controller..!'})
    }
}


const updateLevel = async function(req, res){
    try{
        let levelId = req.body.levelId;
        let { levelName, minimumUser, L1Commission, L2Commission, downlineReferralCommission } = req.body
        let obj = {
            levelName : levelName ? levelName : undefined,
            minimumUser : minimumUser ? minimumUser : undefined,
            L1Commission : L1Commission ? L1Commission : undefined,
            L2Commission : L2Commission ? L2Commission : undefined,
            downlineReferralCommission : downlineReferralCommission ? downlineReferralCommission : undefined,
        }
        await Level.findByIdAndUpdate({_id : levelId}, {$set : obj}, {new : true});
        return res.status(200).json({error_code : 200, message : 'level update successfully..!'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside updateLevel api in manageCommission controller..!'})
    }
}

const deleteLevel= async function(req, res){
    try{
        let levelId = req.body.levelId;
       let level = await Level.findByIdAndDelete(levelId);
       if(!level){
        return res.status(200).json({error_code : 404, message : 'level not exist..!'})
       }
        return res.status(200).json({error_code : 200, message : 'level delete successfully..!'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside deleteLevel api in manageCommission controller..!'})
    }
}


module.exports = {
    createLevel,
    getLevel,
    updateLevel,
    deleteLevel,
    searchLevel
}