const config = require('../config.json');
const db = require('../config/db');
const CommentModel = db.Comments;

module.exports = {
    postComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment
};


//POST comment
async function postComment(req, res) {
    //validate
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request Body is missing!!!');
    }

    if (!req.body.name) {
        return res.status(422).json({
            errors: {
                name: 'is required',
            },
        });
    }

    if (!req.body.desc) {
        return res.status(422).json({
            errors: {
                desc: 'is required',
            },
        });
    }

    var id = req.params.blogid;

    //save comment in db
    CommentModel.create({
        postid: id,
        commentid: req.body.commentid,
        name: req.body.name,
        comment: req.body.desc
    }, function (err, data) {
        if (err)
            res.send(err);

        res.send({ "message": "success", "data": data });
    });

};

//GET all comments of a blog
async function getAllComments(req, res) {
    CommentModel.find({ postid: req.params.blogid }, function (err, Comments) {

        if (err) {
            res.send(err);
        }

        res.json(Comments);
    });
};

//GET  comment by Id of a blog
async function getComment(req, res) {
    CommentModel.find({ postid: req.params.blogid, commentid: req.params.commentid }, function (err, Comments) {

        if (err) {
            res.send(err);
        }
        if (Object.keys(Comments).length !== 0)
            res.json(Comments);
        else
            res.json({ "message": "No comment found!!" })
    });
};


//PUT comment
async function updateComment(req, res) {
    //validate
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request Body is missing!!!');
    }

    if (!req.body.name) {
        return res.status(422).json({
            errors: {
                name: 'is required',
            },
        });
    }

    if (!req.body.desc) {
        return res.status(422).json({
            errors: {
                desc: 'is required',
            },
        });
    }

    var id = req.params.blogid;

    //save comment in db
    const commentData = {
        name: req.body.name,
        comment: req.body.desc,
        date: req.body.date
    }

    CommentModel.findOneAndUpdate({
        postid: id,
        commentid: req.params.commentid
    }, commentData, { new: true })
        .then((doc) => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send({ "message": "Comment updated successfully!!!", "data": doc });
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });

};


//DELETE  comment  
async function deleteComment(req, res) {
    CommentModel.findOneAndDelete(
        {
            postid: req.params.blogid,
            commentid: req.params.commentid
        }
    )
        .then((doc) => {
            res.status(201).send({ "message": "Comment deleted successfully!!!!!", "data": doc });
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}

async function likeComment(req, res) {
    //update like count in db
    CommentModel.findOneAndUpdate({
        postid:  req.params.blogid,
        commentid: req.params.commentid
    },{ $inc: { like: 1 } }, { new: true })
        .then((doc) => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send({ "message": "You liked this comment!!", "data": doc });
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}

async function dislikeComment(req, res) {
    //update like count in db
    CommentModel.findOneAndUpdate({
        postid:  req.params.blogid,
        commentid: req.params.commentid
    },{ $inc: { dislike: 1 } }, { new: true })
        .then((doc) => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send({ "message": "You disliked this comment!!", "data": doc });
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}