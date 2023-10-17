const express = require ('express');
const { getAllProducts,createProduct, updateproduct, deleteproduct, getProductDetails, createProductReview,getAdminProducts , getProductReviews, DltProductReviews} = require('../controllers/productcontroller');
const {isAuthenticatedUser,authorizeRoles} = require('../middleware/auth')

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('/admin/products').get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts )
router.route('/admin/products/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateproduct);
router.route('/admin/products/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct)
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticatedUser,createProductReview)
router.route('/reviews').get(getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser,DltProductReviews)



module.exports = router