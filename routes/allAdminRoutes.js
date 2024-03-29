const express = require('express');
const router = express.Router();
const requireAdminAuth = require('../middleware/requireAdminAuth');
//// REQUIRE ADMIN AUTH TO PERFORM
const AdminLogin = require('../controllers/adminControllers/adminLoginController');
router.post('/adminLogin', AdminLogin);


// PRODUCTS
const { fetchProductsById, fetchProductsByPage, updateProduct, addNewProduct, validateInformationforUpdate, validateInformationforAdding } = require('../controllers/adminControllers/allProductsController');
// Get all products
router.post('/allproducts', requireAdminAuth, fetchProductsByPage);
// Get detail for one product
router.get('/allproducts/:id', requireAdminAuth, fetchProductsById);
// For updating product's information
router.post('/products/:id', requireAdminAuth, validateInformationforUpdate, updateProduct);
// For adding a new product
router.post('/addProduct', requireAdminAuth, validateInformationforAdding, addNewProduct);



// VOUCHERS
const { fetchVouchersByPage, fetchVoucherById, addNewVoucher, deleteVoucher } = require('../controllers/adminControllers/allVouchersController');
// For fetching all vouchers
router.post('/allVouchers', requireAdminAuth, fetchVouchersByPage);
// Get detail for one voucher
router.get('/voucher/:id', requireAdminAuth, fetchVoucherById);
// Add a new voucher
router.post('/voucher', requireAdminAuth, addNewVoucher);
// Delete a voucher
router.delete('/voucher', requireAdminAuth, deleteVoucher);



// USERS
const { fetchUsersByPage, fetchUserById, restrictUser, removeRestrictUser } = require('../controllers/adminControllers/allUsersController');
// Fetch users by page
router.post('/allUsers', requireAdminAuth, fetchUsersByPage);
// Get detail for one voucher
router.get('/allUsers/:id', requireAdminAuth, fetchUserById);
// Restrict user
router.post('/restrict', requireAdminAuth, restrictUser);
// Remove restrict
router.post('/removeRestrict', requireAdminAuth, removeRestrictUser);


// REPORTS
const { fetchReportsByPage, fetchReportById, deleteReport } = require('../controllers/adminControllers/allReportsController');
// For fetching all reports
router.post('/reports', requireAdminAuth, fetchReportsByPage);
// Get detail for one report
router.get('/reports/:id', requireAdminAuth, fetchReportById);
// Delete a report
router.delete('/report', requireAdminAuth, deleteReport);


// ORDERS
const { fetchPendingOrdersByPage, fetchOrderById, confirmShippingOrder, fetchConfirmedOrdersByPage } = require('../controllers/adminControllers/adminOrderController');
// Fetch pending orders by page
router.post('/pendingOrders', requireAdminAuth, fetchPendingOrdersByPage);
// Fetch confirmed orders by page
router.post('/confirmedOrders', requireAdminAuth, fetchConfirmedOrdersByPage);
// Fetch order by ID
router.get('/orders/:id', requireAdminAuth, fetchOrderById);
// Confirmation for a pending orders
router.post('/pendingOrders/:id', requireAdminAuth, confirmShippingOrder);

module.exports = router;