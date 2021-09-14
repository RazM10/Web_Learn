const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    role: {
        type: String,
        enum: ['super admin', 'admin', 'employee'],
        default: 'employee'
    },
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);