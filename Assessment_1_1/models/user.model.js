const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    hash_password: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);