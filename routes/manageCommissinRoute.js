const express = require('express');
const Router = express.Router();

const manageCommissionCon = require('../controllers/manageCommissionCon');
const middleware = require('../middleware/manageCommissionMidd');

Router.post('/createLevel', [middleware.checkLevelBody, middleware.updateLevelMidd] , manageCommissionCon.createLevel);
Router.get('/getLevel', manageCommissionCon.getLevel); 
Router.get('/searchLevel', manageCommissionCon.searchLevel); 
Router.put('/updateLevel', [middleware.updateLevelMidd], manageCommissionCon.updateLevel);
Router.delete('/deleteLevel', manageCommissionCon.deleteLevel);



module.exports = Router;