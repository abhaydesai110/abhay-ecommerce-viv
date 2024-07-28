const express = require("express");
const {addProduct} = require("../../controller/Admin/product/product");
const helper = require("../../utilities/helper");
const {getOneProduct} = require("../../controller/Admin/product/productGetOne");
const {deleteProduct} = require("../../controller/Admin/product/deletProductApi");
const {getAllProduct} = require("../../controller/Admin/product/getAllProduct");
const router = express.Router();

router.post("/add", helper.authenticateToken, addProduct);
router.get("/getone", helper.authenticateToken, getOneProduct);
router.get("/getallproduct", helper.authenticateToken, getAllProduct);
router.delete("/deleteproduct", helper.authenticateToken, deleteProduct);

module.exports = router;
