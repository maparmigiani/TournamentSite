/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */


var express = require('express');
var router = express.Router();
  
let topicController = require('../controllers/topic');

let jwt = require('jsonwebtoken');

let passport = require('passport');
/** Show Forum Topics available  */
router.get('/list', topicController.displayTopics);

/* Post Route for the Edit topic page - Update Operation */
router.post('/edit/:id',passport.authenticate('jwt', {session: false}), topicController.processEditPage);

/* Post Route for the ADD topic page - Update Operation */
router.post('/add',passport.authenticate('jwt', {session: false}), topicController.processAddPage);
 
module.exports = router;