const mongoConnection = require("../../../utilities/connections");
const constants = require("../../../utilities/constants");
const designCodeModel = require("../../../models/Admin/designCode/designCodemodel");
const responseManager = require("../../../utilities/response.manager");
const mongoose = require("mongoose");

exports.manageDesignCode = async (req, res) => {
  const {designCodeId, code, description} = req.body;
  const primary = await mongoConnection.useDb(constants.DEFAULT_DB);
  if (designCodeId && mongoose.Types.ObjectId.isValid(designCodeId)) {
    try {
      const existingDesignCode = await primary.model(constants.MODELS.designCode, designCodeModel).findById(new mongoose.Types.ObjectId(designCodeId));
      if (!existingDesignCode) {
        return responseManager.badrequest({message: "Invalid design code ID...!"}, res);
      } else {
        const updatedData = {code, description, updatedAt: new Date(), createdBy: req.token._id, updatedBy: req.token._id};
        let updatedDesignCode = await primary.model(constants.MODELS.designCode, designCodeModel).findByIdAndUpdate(designCodeId, updatedData, {new: true}).lean();
        return responseManager.onSuccess("Design code updated successfully...!", updatedDesignCode, res);
      }
    } catch (error) {
      return responseManager.badrequest({message: "Error updating design code", error}, res);
    }
  } else {
    try {
      const existingCode = await primary.model(constants.MODELS.designCode, designCodeModel).findOne({code});
      if (existingCode) {
        return responseManager.badrequest({message: "Design code already exists...!"}, res);
      } else {
        let newDesignCode = await primary.model(constants.MODELS.designCode, designCodeModel).create({code, description, createdBy: req.token._id, updatedBy: req.token._id});
        return responseManager.onSuccess("Design code created successfully...!", newDesignCode, res);
      }
    } catch (error) {
      console.log("error", error);
      return responseManager.badrequest({message: "Error creating design code", error}, res);
    }
  }
};
