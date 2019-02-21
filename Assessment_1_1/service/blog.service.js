const config = require('../config.json');
const db = require('../config/db');
const BlogModel = db.Blog;

module.exports = {
    newBlog,
    getAllBlog,
    getBlog,
    updateBlog,
    deleteBlog
};


//create new blog (POST)
async function newBlog(req, res) {
    //validate
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request Body is missing!!!');
    }

    if (!req.body.title) {
        return res.status(422).json({
            errors: {
                title: 'is required',
            },
        });
    }

    if (!req.body.blogby) {
        return res.status(422).json({
            errors: {
                blogby: 'is required',
            },
        });
    }

    if (!req.body.content) {
        return res.status(422).json({
            errors: {
                content: 'is required',
            },
        });
    }
    //save blog to db
    let model = new BlogModel(req.body);
    model.save()
        .then((doc) => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send({ "message" : "Blog posted successfully!!", "blog" : doc});
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}


// GET all blogs
async function getAllBlog(req, res) {
    BlogModel.find()
        .then((doc) => {
            res.status(201).send(doc);
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}



// GET blog by blogId
async function getBlog(req, res) {
    BlogModel.findOne(
        {
            blogid: req.params.blogid
        }
    )
        .then((doc) => {
            console.log(doc);
            res.status(201).send(doc);
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}



//update blog (PUT)
async function updateBlog(req, res) {
    //validate
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('Request Body is missing!!!');
    }

    if (!req.body.title) {
        return res.status(422).json({
            errors: {
                title: 'is required',
            },
        });
    }

    if (!req.body.blogby) {
        return res.status(422).json({
            errors: {
                blogby: 'is required',
            },
        });
    }

    if (!req.body.content) {
        return res.status(422).json({
            errors: {
                content: 'is required',
            },
        });
    }

    BlogModel.findOneAndUpdate({
        blogid: req.params.blogid
    }, req.body, { new: true })
        .then((doc) => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc);
            }
            res.status(201).send({ "message" : "Blog updated successfully!!", "blog" : doc});
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}


//DELETE  blog  
async function deleteBlog(req, res) {
    BlogModel.findOneAndDelete(
        {
            blogid: req.params.blogid
        }
    )
        .then((doc) => {
            if (Object.keys(doc).length === 0) {
                res.status(400).send('Blog with this id does not exist!!!');
            } else {
            res.status(201).send({ "message" : "Blog deleted successfully!!", "blog" : doc});
            }
        }
        )
        .catch(err => {
            res.status(500).json(err);
        });
}   

