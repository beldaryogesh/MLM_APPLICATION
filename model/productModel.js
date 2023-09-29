const mongoose = require('mongoose');
const constant = require('../constant/constat');


const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String, 
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: [constant.Active, constant.Inactive],
    default: constant.Inactive
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
