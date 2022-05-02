/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */


 var express = require('express');
 var router = express.Router();
   
 let commentController = require('../controllers/comment');
 let jwt = require('jsonwebtoken');

 let passport = require('passport');
  
 /** Show Forum Comments available  */
 router.get('/list', commentController.displayComments);
 
 /* Post Route for the Edit comment page - Update Operation */
 router.post('/edit/:id',passport.authenticate('jwt', {session: false}), commentController.processEditPage);
 
 /* Post Route for the ADD comment page - Update Operation */
 router.post('/add',passport.authenticate('jwt', {session: false}), commentController.processAddPage);
  
 module.exports = router;