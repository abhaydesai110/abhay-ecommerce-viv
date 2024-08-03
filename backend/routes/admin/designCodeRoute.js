const express = require("express");
const {manageDesignCode} = require("../../controller/Admin/designCode/designCode");
const helper = require("../../utilities/helper");
const {deleteDesignCode} = require("../../controller/Admin/designCode/DeleteDesignCode");
const router = express.Router();

router.post("/add", helper.authenticateToken, manageDesignCode);
router.delete("/delete", helper.authenticateToken, deleteDesignCode);

module.exports = router;
