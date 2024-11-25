const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
