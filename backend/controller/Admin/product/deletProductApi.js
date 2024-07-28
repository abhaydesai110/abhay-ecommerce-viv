const mongoConnection = require("../../../utilities/connections");
const productModel = require("../../../models/Admin/Product/product.model");
const constants = require("../../../utilities/constants");
const {default: mongoose} = require("mongoose");
const responseManager = require("../../../utilities/response.manager");

exports.deleteProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const primary = mongoConnection.useDb(constants.DEFAULT_DB);
  const adminID = req.token._id;
  const {productId} = req.query;
  if (productId && productId != "" && mongoose.Types.ObjectId.isValid(productId)) {
    const productModelInstance = primary.model(constants.MODELS.product, productModel);

    const updateResult = await productModelInstance.findByIdAndUpdate(new mongoose.Types.ObjectId(productId), [{$set: {isDeleted: {$eq: [false, "$isDeleted"]}}}], {new: true}).lean();

    if (updateResult) {
      return responseManager.onSuccess(`Product ${updateResult?.isDeleted ? "marked as deleted" : "restored"} successfully.`, updateResult, res);
    } else {
      return responseManager.badrequest({message: "Product not found."}, res);
    }
  } else {
    return responseManager.badrequest({message: "Invalid product ID..!"}, res);
  }
};
