const express = require("express");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongoose = require("mongoose");

const designCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {type: Date, default: Date.now},
    createdBy: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
  },
  {timestamps: true, strict: false, autoIndex: true}
);
designCodeSchema.plugin(mongoosePaginate);

module.exports = designCodeSchema;
