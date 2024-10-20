// const backendDomin = "http://localhost:8080";
const backendDomin = "https://smmerndash.onrender.com";

const SummaryApi = {
  //utils
  salesCounter: {
    url: `${backendDomin}/api/salescounter`,
    method: "get",
  },
  orders: {
    url: `${backendDomin}/api/orders`,
    method: "get",
  },
  products: {
    url: `${backendDomin}/api/products`,
    method: "get",
  },

  //Courier sfcs
  createSFCS: {
    url: `${backendDomin}/api/create-sfcs`,
    method: "post",
  },
  updateSFCS: {
    url: `${backendDomin}/api/update-sfcs`,
    method: "post",
  },
  getSFCS: {
    url: `${backendDomin}/api/get-sfcs`,
    method: "get",
  },

  //User
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  users: {
    url: `${backendDomin}/api/get-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },

  //Customer
  createCustomer: {
    url: `${backendDomin}/api/create-customer`,
    method: "post",
  },
  searchCustomer: {
    url: `${backendDomin}/api/search-customer`,
    method: "get",
  },
  customers: {
    url: `${backendDomin}/api/customers`,
    method: "get",
  },
  singleCustomer: {
    url: `${backendDomin}/api/single-customers`,
    method: "get",
  },
  updateCustomer: {
    url: `${backendDomin}/api/update-customer`,
    method: "post",
  },

  //Order
  uploadOrder: {
    url: `${backendDomin}/api/upload-order`,
    method: "post",
  },
  updateOrder: {
    url: `${backendDomin}/api/update-order`,
    method: "post",
  },
  allOrder: {
    url: `${backendDomin}/api/get-order`,
    method: "get",
  },
  singleOrder: {
    url: `${backendDomin}/api/order-details`,
    method: "post",
  },

  //Product
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
};

export default SummaryApi;
