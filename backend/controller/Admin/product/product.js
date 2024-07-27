const mongoConnection = require("../../../utilities/connections");
const adminModal = require("../../../models/Admin/admins.model");
const productModal = require("../../../models/Admin/Product/product.model");
const constants = require("../../../utilities/constants");
const mongoose = require("mongoose");
const responseManager = require("../../../utilities/response.manager");

exports.addProduct = async (req, res) => {
  const {productId, name, description, brand, actualPrice, discountPrice, size, imageWithColour, quantity, season, fabric, wash} = req.body;
  const primary = await mongoConnection.useDb(constants.DEFAULT_DB);
  const adminData = await primary.model(constants.MODELS.admins, adminModal).findById(new mongoose.Types.ObjectId(req.token._id));
  const product = await primary.model(constants.MODELS.product, productModal);
  if (productId && productId != null && mongoose.Types.ObjectId.isValid(productId)) {
    try {
      const product = await primary.model(constants.MODELS.product, productModal).findById(new mongoose.Types.ObjectId(productId)).lean();
      if (!product) {
        return responseManager.badrequest({message: "Invalid product ID...!"}, res);
      } else {
        const existingName = await primary.model(constants.MODELS.product, productModal).findOne({name});
        if (existingName) {
          return responseManager.badrequest({message: "Name already exist..!"}, res);
        } else {
          const obj = {
            name: name,
            description: description,
            brand: brand,
            actualPrice: actualPrice,
            discountPrice: discountPrice,
            size: size,
            imageWithColour: imageWithColour,
            quantity: quantity,
            season: season,
            fabric: fabric,
            wash: wash,
            isDeleted: false,
            updatedBy: new mongoose.Types.ObjectId(adminData._id),
            updatedAt: new Date(),
          };
          let updatedVillageData = await primary.model(constants.MODELS.product, productModal).findByIdAndUpdate(product._id, obj, {returnOriginal: false}).lean();
          return responseManager.onSuccess("Product updated successfully...!", updatedVillageData, res);
        }
      }
    } catch (error) {
      console.log("error", error);
      return responseManager.badrequest({message: "Error updating product"}, res);
    }
  } else {
    try {
      const existingName = await primary.model(constants.MODELS.product, productModal).findOne({name});
      if (existingName) {
        return responseManager.badrequest({message: "Name already exist..!"}, res);
      } else {
        let obj = {
          name: name,
          description: description,
          brand: brand,
          actualPrice: actualPrice,
          discountPrice: discountPrice,
          size: size,
          imageWithColour: imageWithColour,
          quantity: quantity,
          season: season,
          fabric: fabric,
          wash: wash,
          isDeleted: false,
          createdBy: new mongoose.Types.ObjectId(adminData._id),
          create_timestamp: Date.now(),
        };
        let newProduct = await primary.model(constants.MODELS.product, productModal).create(obj);
        return responseManager.onSuccess("Product created successfully...!", newProduct, res);
      }
    } catch (error) {
      console.log("error", error);
      return res.status(400).json({message: "Error creating product", error});
    }
  }
};
