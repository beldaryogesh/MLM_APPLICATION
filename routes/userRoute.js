const express = require('express');
const Router = express();
const check_body = require('../middleware/userMiddleware');
const commonMidd = require('../middleware/verifyToken')

const User = require('../controllers/UserController');



Router.post('/personal_details_1', User.personal_details_1);
Router.post('/verify-otp',[commonMidd.authenticateUser], User.verifyOtp);
Router.put('/personal_details_2', [commonMidd.authenticateUser, check_body.personal_details_2], User.personal_details_2);
Router.put('/identity_details', [commonMidd.authenticateUser, check_body.identity_details ], User.identity_details);
Router.put('/family_details', [commonMidd.authenticateUser , check_body.family_details], User.family_details);
Router.put('/bank_details', [commonMidd.authenticateUser, check_body.bank_details ], User.bank_details);
Router.put('/payment_details', [commonMidd.authenticateUser, check_body.payment_details], User.payment_details);


Router.post('/loginUser', User.userLogin);

module.exports = Router;
