const mongoConnection = require("../../../utilities/connections");
const adminModal = require("../../../models/Admin/admins.model");
const productModal = require("../../../models/Admin/Product/product.model");
const constants = require("../../../utilities/constants");
const mongoose = require("mongoose");
const responseManager = require("../../../utilities/response.manager");

exports.getAllProduct = async (req, res) => {
  const primary = mongoConnection.useDb(constants.DEFAULT_DB);
  const productData = await primary.model(constants.MODELS.product, productModal).find();
  if (productData) {
    return responseManager.onSuccess("All Product Data ..!", productData, res);
  }
};
