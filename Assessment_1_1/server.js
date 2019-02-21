const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const router=express.Router();
const path=require('path');
const app = express(); // creates an express application
const database = require("./config/db");
const port = process.env.port || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//controller
app.use('/user', require('./controller/user.controller'));
app.use('/user/blog', require('./controller/blog.controller'));
app.use('/user/blog/comments', require('./controller/comments.controller'));

//listen to server 3000
app.listen(port,()=>{
    console.log(app.get('port'));
});