const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },

    Kamlik: {
        type: String,
        required: true,
    },
    belgeNo: {
        type: String,
        required: true,
    },
    egitim: {
        type: String,
        required: true,
    },
    aciklama: {
        type: String,
        required: false,
    },

});

brandSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

brandSchema.set('toJSON', {
    virtuals: true,
});

exports.Brand = mongoose.model('Brand', brandSchema);
exports.brandSchema = brandSchema;