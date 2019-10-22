const mongoose = require('mongoose');

const schema = {
  title: String,
  content: String,
  slug: String,
};

module.exports = mongoose.model('Blog', schema);
