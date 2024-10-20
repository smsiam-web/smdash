const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const UploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const UploadOrderController = require("../controller/order/uploadOrder");
const UpdateOrderController = require("../controller/order/updateOrder");
const getOrderController = require("../controller/order/getOrder");
const salesCounterDetailsController = require("../controller/utils/getSalesCounter");
const orderController = require("../controller/order/orderPagination");
const getSingleOrder = require("../controller/order/getSingleOrder");
const productController = require("../controller/product/productPagination");
const CreateCustomerController = require("../controller/customer/createCustomer");
const searchCustomerController = require("../controller/customer/searchCustomer");
const updateCustomerController = require("../controller/customer/updateCustomer");
const getCustomerController = require("../controller/customer/customerPagination");
const getUserController = require("../controller/user/userPagination");
const CreateSFCSController = require("../controller/courier/sfcs/createSfcs");
const updateSFCSController = require("../controller/courier/sfcs/updateSfcs");
const getSFCSController = require("../controller/courier/sfcs/getSfcs");
const getSingleCustomerController = require("../controller/customer/getCustomer");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//User
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.get("/get-user", getUserController);

//Courier
router.post("/create-sfcs", authToken, CreateSFCSController);
router.post("/update-sfcs", authToken, updateSFCSController);
router.get("/get-sfcs", getSFCSController);

//Customer
router.post("/create-customer", authToken, CreateCustomerController);
router.get("/search-customer", searchCustomerController);
router.get("/customers", getCustomerController);
router.get("/single-customers", getSingleCustomerController);
router.post("/update-customer", authToken, updateCustomerController);

//order
router.post("/upload-order", authToken, UploadOrderController);
router.post("/update-order", authToken, UpdateOrderController);
router.get("/get-order", getOrderController);
router.get("/orders", orderController);
router.post("/order-details", getSingleOrder);

//product
router.post("/upload-product", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.get("/products", productController);
router.post("/filter-product", filterProductController);

//user add to cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/view-card-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

//utils
router.get("/salescounter", salesCounterDetailsController);

module.exports = router;
