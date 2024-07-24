const connection = require("../../../utilities/connections");
const mongoose = require("mongoose");
const constants = require("../../../utilities/constants");
const productModel = require("../../../models/Admin/Product/product.model");
const responseManager = require("../../../utilities/response.manager");
const adminModel = require("../../../models/Admin/admins.model");

exports.addProduct = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const {
    productId,
    name,
    description,
    brand,
    actualPrice,
    discountPrice,
    size,
    imageWithColour,
    quantity,
    season,
    fabric,
    wash,
  } = req.body;
  try {
    if (req.token._id && mongoose.Types.ObjectId.isValid(req.token._id)) {
      console.log(
        "mongoose.Types.ObjectId.isValid(req.token._id)",
        mongoose.Types.ObjectId.isValid(req.token._id)
      );
      console.log("req.token._id", req.token._id);
      const primary = connection.useDb(constants.DEFAULT_DB);
      const adminData = await primary
        .model(constants.MODELS.admins, adminModel)
        .findById(new mongoose.Types.ObjectId(req.token._id))
        .lean();
      if (
        productId &&
        productId.trim() != "" &&
        mongoose.Types.ObjectId.isValid(productId)
      ) {
        const existingProduct = await primary
          .model(constants.MODELS.product, productModel)
          .findOne({ name: name.trim() })
          .lean();
        console.log("existingProduct", existingProduct);
        if (existingProduct) {
          return responseManager.badrequest(
            {
              message:
                "Product Name is already exist please add with Different name...!",
            },
            res
          );
        } else {
          const object = {
            name: name.trim(),

            description: description.trim(),
            brand: brand.trim(),
            actualPrice: actualPrice,
            discountPrice: discountPrice,
            size: size,
            imageWithColour: imageWithColour,
            quantity: quantity,
            season: season.trim(),
            fabric: fabric.trim(),
            wash: wash.trim(),
            updatedBy: new mongoose.Types.ObjectId(adminData._id),
            update_timestamp: Date.now(),
          };
          const updatedProductData = primary
            .model(constants.MODELS.product, productModel)
            .findByIdAndUpdate(new mongoose.Types.ObjectId(object))
            .lean();
          if (updatedProductData) {
            return responseManager.onSuccess(
              "Product data updated successfully...!",
              updatedProductData,
              res
            );
          }
        }
      } else {
        const object = {
          name: name.trim(),
          description: description.trim(),
          brand: brand.trim(),
          actualPrice: actualPrice,
          discountPrice: discountPrice,
          size: size,
          imageWithColour: imageWithColour,
          quantity: quantity,
          season: season.trim(),
          fabric: fabric.trim(),
          wash: wash.trim(),
          createdBy: new mongoose.Types.ObjectId(adminData._id),
          create_timestamp: Date.now(),
        };
        const newProductCreate = await primary
          .model(constants.MODELS.product, productModel)
          .create(object);
        console.log("newProductCreate", newProductCreate);
        if (newProductCreate) {
          return responseManager.onSuccess(
            "New Product added successfully...!",
            newProductCreate,
            res
          );
        }
      }
    }
  } catch (error) {
    console.log("error", error);
    console.log("error.imageWithColour", error.imageWithColour);
    return responseManager.badrequest(
      { message: error.errors.imageWithColour.message },
      res
    );
  }
};
