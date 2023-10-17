const express = require('express');
const { registerUser,loginUser, logout ,forgotPassword ,resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllusersAdmin, getAllusersDetails, getSingleusersDetails, updateUserRoleAdmin, DeleteuserRoleAdmin} = require('../controllers/UserController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth')
const router = express.Router();

router.route('/register').post(registerUser);
router.route("/login").post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword );
router.route('/password/reset/:token').put(resetPassword);


router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateUserProfile);

//only for admns
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllusersAdmin)
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getSingleusersDetails);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRoleAdmin);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),DeleteuserRoleAdmin);


module.exports = router;