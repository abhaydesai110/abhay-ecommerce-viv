const connection = require("../../../utilities/connections")
const constants = require('../../../utilities/constants');
const responseManager = require('../../../utilities/response.manager');
const adminModel = require('../../../models/Admin/admins.model');
const sizeChartModal = require("../../../models/Admin/sizeChart/sizeChart.model");
const { default: mongoose } = require("mongoose");

exports.addSizeChart = async (req, res) => {
    console.log('token', req.token)
    console.log('body', req.body)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.token._id && mongoose.Types.ObjectId.isValid(req.token._id)) {
        const primary = connection.useDb(constants.DEFAULT_DB)
        const adminData = await primary.model(constants.MODELS.admins, adminModel).findById(new mongoose.Types.ObjectId(req.token._id)).lean()
        if (adminData && adminData != null) {
            const { chartId, gender, category, chart } = req.body
            const chartData = await primary.model(constants.MODELS.size_chart, sizeChartModal).findById(new mongoose.Types.ObjectId(chartId)).lean()
            if (chartData && chartData != null) {
                checkExistChartData = await primary.model(constants.MODELS.size_chart, sizeChartModal).find({
                    _id: { $ne: new mongoose.Types.ObjectId(chartId) }, $or: [
                        // { english_name: english_name.trim() },
                        // { gujarati_name: gujarati_name.trim() },
                        // { code: code.trim().toUpperCase() }
                    ]
                }).lean()
                if (checkExistChartData && checkExistChartData != null) {
                    
                }
            }
        }
    }
}