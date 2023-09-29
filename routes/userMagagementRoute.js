const express = require('express');
const Router = express.Router();


const userManagementCon = require('../controllers/UserManagementCon');


Router.get('/getUserByAdmin', userManagementCon.getUser);
Router.get('/getPersonalDetail', userManagementCon.getPersonalDetails);
Router.get('/getIdentityProof', userManagementCon.getIdentityProof);
Router.get('/getBankDetails', userManagementCon.getBankDetails);
Router.get('/getFamilyMembers', userManagementCon.getFamilyMembers);
Router.get('/searchUser', userManagementCon.searchUser);
Router.delete('/deleteUser', userManagementCon.deleteUser);


module.exports = Router;