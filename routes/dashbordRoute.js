const express = require("express");
const Router = express.Router();

const dashbordCon = require('../controllers/dashbordCon');

Router.get('/totalEmployees', dashbordCon.totaleEmployees);
Router.get('/totalCEO', dashbordCon.totaleCEO);
Router.get('/totalGM', dashbordCon.totaleGM);
Router.get('/totalAGM', dashbordCon.totaleAGM);
Router.get('/totalDSM', dashbordCon.totaleDSM);
Router.get('/totalSM', dashbordCon.totaleSM);
Router.get('/totalSA', dashbordCon.totaleSA);
Router.get('/totalRevenue', dashbordCon.TotalRevenue);
Router.get('/todayRevenue', dashbordCon.todayRevenue);
Router.get('/totalUser', dashbordCon.totalUser);
Router.get('/todayUser', dashbordCon.todayUser);
Router.get('/levelOneUser', dashbordCon.level_1_User);
Router.get('/levelTwoUser', dashbordCon.level_2_User);
Router.get('/levelThreeUser', dashbordCon.level_3_User);
Router.get('/levelForeUser', dashbordCon.level_4_User);
Router.get('/levelFiveUser', dashbordCon.level_5_User);
Router.get('/levelSixUser', dashbordCon.level_6_User);
Router.get('/crownUser', dashbordCon.crownUser);

module.exports = Router;