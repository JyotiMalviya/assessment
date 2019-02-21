var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


let commentsSchema = new Schema(
    {
        id: ObjectId,
        postid: { type: String },
        commentid: {type: String},
        name: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now },
        like: {type: Number, default:0},
        dislike: {type: Number, default:0}
    }
);

commentsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Comments', commentsSchema);
