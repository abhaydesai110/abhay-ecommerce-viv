const mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate-v2");

const imageWithColourSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
      required: true,
    },
    otherImage: {
      type: [String], // Array of strings
      required: true,
    },
  },
  { _id: false }
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    actualPrice: {
      type: Number,
      require: true,
    },
    discountPrice: {
      type: Number,
      require: true,
    },
    size: {
      type: Array,
      require: true,
    },
    imageWithColour: {
      type: [imageWithColourSchema], //
      require: true,
      validate: {
        validator: function (value) {
          const colors = value.map((item) => item.color);
          return colors.length === new Set(colors).size; // Ensure all colors are unique
        },
        message: (props) =>
          `Duplicate color values found in imageWithColour array!`,
      },
    },
    quantity: {
      type: Number,
      require: true,
    },
    season: {
      type: String,
      require: true,
    },
    fabric: {
      type: String,
      require: true,
    },
    wash: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true, strict: false, autoIndex: true }
);
productSchema.plugin(mongoosePaginate);
module.exports = productSchema;
