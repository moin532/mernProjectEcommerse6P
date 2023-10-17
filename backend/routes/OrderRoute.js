const express= require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, allOrdersAdmin,UpdateOrder , dltorder } = require('../controllers/OrderControlller');
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth');

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("admin"),allOrdersAdmin);
router.route('/admin/order/:id').put(isAuthenticatedUser,authorizeRoles("admin"),UpdateOrder ).delete(isAuthenticatedUser,
authorizeRoles("admin"),dltorder);


module.exports = router;