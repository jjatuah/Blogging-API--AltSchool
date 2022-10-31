const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    tags: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
      enum: ['draft', 'published']
    },

    read_count: {
      type: Number,
      default: 0,
    },

    reading_time: {
      type: Number
    },

    body: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);