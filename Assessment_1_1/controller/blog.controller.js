const express = require('express');
const router = express.Router();
const blogService = require('../service/blog.service');



router.use(require('../config/tokenChecker'));
router.post('/createBlog', blogService.newBlog);
router.get('/getAllBlog', blogService.getAllBlog);
router.get('/getBlog/:blogid', blogService.getBlog);
router.put('/updateBlog/:blogid', blogService.updateBlog);
router.delete('/deleteBlog/:blogid', blogService.deleteBlog);


module.exports = router;