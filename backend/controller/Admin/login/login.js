const mongoConnection = require('../../../utilities/connections');
const constants = require('../../../utilities/constants');
const helper = require('../../../utilities/helper');
const responseManager = require('../../../utilities/response.manager');
const adminOLoginModal = require("../../../models/Admin/admins.model")

exports.signInAdmin = async (req, res) => {
    console.log("first")
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { email, password } = req.body
    if (email && email != null && email.trim() != '' && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        if (password && password != null && password.trim() != '') {
            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
            let adminData = await primary.model(constants.MODELS.admins, adminOLoginModal).findOne({ email: email.trim() }).lean();
            if (adminData && adminData != null) {
                if (password === adminData.password) {
                    let accessToken = await helper.generateAccessToken({ _id: adminData._id.toString() });
                    const data = { accessToken: accessToken }
                    return responseManager.onSuccess('Admin login successfully...!', data, res)
                } else {
                    return responseManager.badrequest({ message: 'Invalid email or password to login...!' }, res);
                }
            } else {
                return responseManager.badrequest({ message: 'no user on this email address...!' }, res);
            }
        } else {
            return responseManager.badrequest({ message: 'Password incorrect...!' }, res);
        }
    } else {
        return responseManager.badrequest({ message: 'Email incorrect...!' }, res);
    }
}