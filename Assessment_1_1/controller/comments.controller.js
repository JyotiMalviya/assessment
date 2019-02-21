const express = require('express');
const router = express.Router();
const commentsService = require('../service/comments.service');


//routings
router.use(require('../config/tokenChecker'));
router.post('/postComment/:blogid', commentsService.postComment);
router.get('/getAllComments/:blogid', commentsService.getAllComments);
router.get('/getComment/:blogid/:commentid', commentsService.getComment);
router.put('/updateComment/:blogid/:commentid', commentsService.updateComment);
router.delete('/deleteComment/:blogid/:commentid', commentsService.deleteComment);
router.post('/likeComment/:blogid/:commentid', commentsService.likeComment);
router.post('/dislikeComment/:blogid/:commentid', commentsService.dislikeComment);



module.exports = router;