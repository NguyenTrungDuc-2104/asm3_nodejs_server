const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const isRole = require("../middleware/is-role");
const multer = require("../middleware/multer_image");
const productController = require("../controllers/product");

//=======================user==============================

//-------------------get products-------------------------
router.get("/get_products", productController.getHomeProducts);
//-------------------shop--------------------------
router.get("/get_products/:shopType", productController.getShopProducts);
//-------------------detail-------------------------
router.get("/get_detail/:detailId", productController.getDetailProducts);
//-------------------add cart------------------------
router.post("/post_addToCart", isAuth, productController.addToCart);
//------------------get cart-------------------------
router.get("/get_cart", isAuth, productController.getCart);
//-----------------change cart-----------------------
router.patch("/change_cart", isAuth, productController.changeCart);
//----------------get checkout-----------------------
router.get("/get_checkout", isAuth, productController.getCheckout);
//----------------post checkout-----------------------
router.post(
  "/post_order",
  isAuth,
  [
    body("name", "Please enter your name").trim().notEmpty(),
    body("email", "Please enter your email")
      .isEmail()
      .trim()
      .notEmpty()
      .normalizeEmail(),
    body("phoneNumber", "Please enter your phone number")
      .isNumeric()
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("address", "Please enter your address").trim().notEmpty(),
    body("total").isNumeric().trim().notEmpty(),
  ],
  productController.postOrder
);
//----------------------------------get orders--------------------------
router.get("/get_orders", isAuth, productController.getOrders);
//-----------------------------get detail orders------------------------
router.get("/get_order/:orderId", isAuth, productController.getDetailOrder);

//=================================admin================================
//-------------------------get dashboard------------------------
router.get("/admin/get_dashboard", productController.getDashboard);
//------------------------post new product----------------------
router.post(
  "/admin/post_product",
  isAuth,
  isRole.admin,
  multer,
  productController.potsProduct
);

module.exports = router;
