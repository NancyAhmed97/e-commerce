const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({


});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

exports.Products = mongoose.model('Products', productSchema);
exports.productSchema = productSchema;