const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
  // will add more fields (price, category, etc)

}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);