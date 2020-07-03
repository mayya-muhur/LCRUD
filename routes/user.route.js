'use strict'// to make compiler know that we are using strict verion of js

// Dependancies
var router = require('express').Router();   //we are using .router() in place of app.get both are almost same things just know the difference 
var validate = require('express-validation').validate;
var verifyUser = require('../services/jwt').verfiyUser;
var userController = require('../controllers/user.controller');
var userValidation = require('../validaitons/user.validation');
const { route } = require('../app');

// API 1.1 Login:
router.post(
    '/login',
    validate(userValidation.login, { keyByField: true }),
    userController.login
);

// API 1.2 Change Password:
router.post(
    '/change-password',
    validate(userValidation.changePassword, { keyByField: true }),
    verifyUser,
    userController.changePassword
);

// API 1.3 Add User:
router.post(
    '/signup',
    validate(userValidation.addUser, { keyByField: true }),
    userController.addUser
);

// API 1.4 Delete User:
router.post(
    '/del',
    validate(userValidation.delUser, { keyByField: true }),
    verifyUser,
    userController.delUser
);

// API 1.5 Get Users:
router.post(
    '/get',
    verifyUser,
    userController.getUsers
);
router.post(
    '/dashboard',
    verifyUser
);

module.exports = router;