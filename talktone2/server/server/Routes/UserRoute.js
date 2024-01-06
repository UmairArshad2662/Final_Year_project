const express = require('express');
const bcrypt = require('bcrypt');
const { loginAdmin, loginOperator, registerUser, addOperator, viewOperator, operatorSuggestion,operatorCount, deleteOperator} = require('../controllers/UserController');
const { createProfile, fetchProfile,fetchOperatorProfile } = require('../controllers/profileController');
const { getbill } = require('../controllers/emailController.js')

const AdminRouter = express.Router();
const OperatorRouter = express.Router();
const profileRouter = express.Router();

AdminRouter.post('/loginAdmin', loginAdmin);
AdminRouter.post('/addOperator', addOperator);
AdminRouter.get('/viewOperator', viewOperator);
AdminRouter.get('/operatorSuggestion', operatorSuggestion);
OperatorRouter.post('/loginOperator', loginOperator);
OperatorRouter.post('/registerUser', registerUser);
AdminRouter.delete('/deleteOperator/:cnic', deleteOperator);
AdminRouter.get('/operatorCount', operatorCount);
AdminRouter.get('/operator', operatorCount);
AdminRouter.post('/product/getbill/:cnic', getbill);

profileRouter.post('/createProfile', createProfile);
profileRouter.get('/fetchProfile', fetchProfile);

profileRouter.get('/fetchOperatorProfile/:cnic', fetchOperatorProfile);

module.exports = { AdminRouter, OperatorRouter, profileRouter };
