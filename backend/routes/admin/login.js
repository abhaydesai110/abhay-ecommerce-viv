const express = require("express")
const router = express.Router()
const loginController = require("../../controller/Admin/login/login")
router.post("/", loginController.signInAdmin)
module.exports = router;
