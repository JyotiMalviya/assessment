const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, {useCreateIndex: true, useNewUrlParser: true })
.then(() => {
    console.log("Conected to Database!");
})
.catch((err) => {
    console.log("Connection failed ", err);
});

module.exports = {
    User: require('../models/user.model'),
    Blog: require('../models/blog.model'),
    Comments: require('../models/comments.model')
};
