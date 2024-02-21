const mongoose = require('mongoose');
const { productSchema} = require('../Models/products');
const reviewSchema = new mongoose.Schema({
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
      userId: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    copon: {
        type: Array,
        
    },
    logo: { type: String, required: true },
    reviews: [reviewSchema],

 
    Products: {
        type: [productSchema],
        
    },
    offers: {
        type: Array,
        
    },
    headerImgs:{
        type:Array
    }

});


const brandModel = mongoose.model('Brand', brandSchema);
module.exports =brandModel;