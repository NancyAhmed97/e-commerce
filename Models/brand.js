const mongoose = require('mongoose');
const { productSchema} = require('../Models/products');
const reviewSchema = new mongoose.Schema(
    {
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

brandSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

brandSchema.set('toJSON', {
    virtuals: true,
});

exports.Brand = mongoose.model('Brand', brandSchema);
exports.brandSchema = brandSchema;