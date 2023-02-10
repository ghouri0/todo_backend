const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    item: String,
    create: String,
    comp: String,
    status: String,
  });

module.exports = mongoose.model("Todo", todoSchema);