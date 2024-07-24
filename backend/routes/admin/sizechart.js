const express = require("express")
const router = express.Router()
const helper = require("../../utilities/helper")
const sizeChartController = require("../../controller/Admin/sizeChart/sizeChart")

router.post("/addedit", helper.authenticateToken, sizeChartController.addSizeChart)


module.exports = router