const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    type: {
      type: String,
      enum: ["lost", "found"],
      default: "found",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    foundAt: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      trim: true,
    },
    campusLocation: {
      type: String,
      trim: true,
    },
    campus: {
      type: String,
      trim: true,
    },
    building: {
      type: String,
      trim: true,
    },
    room: {
      type: String,
      trim: true,
    },
    photos: {
      type: [String],
      validate: {
        validator: (photos) => !photos || photos.length <= 3,
        message: "A found item report can contain up to three photos.",
      },
    },
    contactMethod: {
      type: String,
      enum: ["email", "collection"],
      default: "email",
    },
    collectionLocation: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("FoundItem", foundItemSchema);
