const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  fileName: String,
  originalName: String,
  uploadDate: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
