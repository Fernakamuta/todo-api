const mongoose = require('mongoose');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = {User};