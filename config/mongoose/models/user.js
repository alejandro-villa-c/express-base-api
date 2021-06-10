const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: String,
    username: {
        type: String,
        unique: true
    },
    password: String
}, { timestamps: true });
const user = mongoose.model('User', userSchema);

module.exports = user;