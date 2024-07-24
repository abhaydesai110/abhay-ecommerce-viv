const express = require("express")
const { addProduct } = require("../../controller/Admin/product/product")
const helper = require("../../utilities/helper")
const { getOneProduct } = require("../../controller/Admin/product/productGetOne")
const router = express.Router()


router.post('/add', helper.authenticateToken, addProduct)
router.get('/getone', helper.authenticateToken, getOneProduct)


module.exports = router