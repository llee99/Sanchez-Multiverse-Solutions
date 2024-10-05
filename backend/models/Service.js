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
  // Add more fields as necessary, e.g., price, category, etc.
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);