var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

let blogSchema = new Schema(
    {
        id: ObjectId,
        title: { type: String },
        content: { type: String },
        blogby: { type: String },
        blogid: { type: String},
        date: { type: Date, default: Date.now }
    }
);

blogSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Blog', blogSchema);