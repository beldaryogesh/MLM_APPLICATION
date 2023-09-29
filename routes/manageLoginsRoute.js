const express = require('express');
const Router = express.Router();

const check_body = require('../middleware/checkBody');
const checkTypeAccess = require('../middleware/manageLoginsMidd');

const manageLoginCon = require('../controllers/manageLoginsCon');

Router.post('/addAdmin',[check_body.check_body, checkTypeAccess.manageLogins], manageLoginCon.addAdmin);
Router.get('/getLogins',manageLoginCon.getLogins);
Router.put('/updateLoginAdmin',[check_body.update, checkTypeAccess.adminUpdateCheck] ,manageLoginCon.updateAdmin);
Router.get('/serchLoginAdmin', manageLoginCon.serchLoginAdmin);
Router.delete('/deleteLoginAdmin', manageLoginCon.deleteLoginAdmin);


module.exports = Router;

