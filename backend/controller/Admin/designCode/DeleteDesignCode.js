const mongoConnection = require("../../../utilities/connections");
const responseManager = require("../../../utilities/response.manager");
const designCodeModel = require("../../../models/Admin/designCode/designCodemodel");
const constants = require("../../../utilities/constants");
const {default: mongoose} = require("mongoose");

exports.deleteDesignCode = async (req, res) => {

  const {designCodeId} = req.query;
  const primary = await mongoConnection.useDb(constants.DEFAULT_DB);
  if (designCodeId && designCodeId != null && mongoose.Types.ObjectId.isValid(designCodeId)) {
    try {
      let deletedDesignCode = await primary.model(constants.MODELS.designCode, designCodeModel).findByIdAndDelete(new mongoose.Types.ObjectId(designCodeId)).lean();
      if (!deletedDesignCode) {
        return responseManager.badrequest({message: "Design code not found...!"}, res);
      } else {
        return responseManager.onSuccess("Design code deleted successfully...!", deletedDesignCode, res);
      }
    } catch (error) {
      console.log("error", error);
      return responseManager.badrequest({message: "Error deleting design code", error}, res);
    }
  } else {
    return responseManager.badrequest({message: "Invalid design code ID...!"}, res);
  }
};
