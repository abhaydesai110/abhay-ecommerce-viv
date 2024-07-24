let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");
let schema = new mongoose.Schema({
    gender: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        default: null
    }
}, { timestamps: true, strict: false, autoIndex: true });
schema.plugin(mongoosePaginate);
module.exports = schema;