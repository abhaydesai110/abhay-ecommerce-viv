const connection = require("../../../utilities/connections");
const mongoose = require("mongoose");
const constants = require("../../../utilities/constants");
const productModal = require("../../../models/Admin/Product/product.model");
const responseManager = require("../../../utilities/response.manager");
const adminModel = require("../../../models/Admin/admins.model");

exports.getOneProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");
  const primary = connection.useDb(constants.DEFAULT_DB);
  const adminID = req.token._id;
  if (adminID && mongoose.Types.ObjectId.isValid(adminID)) {
    const adminData = await primary
      .model(constants.MODELS.admins, adminModel)
      .findById(new mongoose.Types.ObjectId(adminID))
      .lean();
    if (adminData && adminData != null) {
      const { productId } = req.query;
      if (
        productId &&
        productId.trim() != "" &&
        mongoose.Types.ObjectId.isValid(productId)
      ) {
        const productData = await primary
          .model(constants.MODELS.product, productModal)
          .findById(new mongoose.Types.ObjectId(productId));
        if (productData) {
          return responseManager.onSuccess(
            "Product data get successfully..!",
            productData,
            res
          );
        } else {
          return responseManager.onError(
            { message: "productId is invalid ..!" },
            res
          );
        }
      } else {
        return responseManager.onError(
          { message: "productId is invalid ..!" },
          res
        );
      }
    } else {
      return responseManager.unauthorisedRequest(res);
    }
  } else {
    return responseManager.unauthorisedRequest(res);
  }
};
