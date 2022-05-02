/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 10th 2022
 * @CourseName Web Application Development SEC005
 */


 var express = require('express');
 var router = express.Router();
  
 let tournamentController = require('../controllers/tournament');
 let jwt = require('jsonwebtoken');

let passport = require('passport');


 
/** Show Tournaments available  */
router.get('/list', tournamentController.displayTournaments);

/* Post Route for the Edit tournament page - Update Operation */
router.get('/edit/:id', tournamentController.displayEditPage);

/* Post Route for the Edit tournament page - Update Operation */
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), tournamentController.processEditPage);

/* Get Route for the Add tournament page - Update Operation */
router.get('/add', tournamentController.displayAddPage);

/* Post Route for the ADD tournament page - Update Operation */
router.post('/add', tournamentController.processAddPage);

/* GET Route for the Delete tournament page - Delete Operation */
router.get('/delete/:id', passport.authenticate('jwt', {session: false}), tournamentController.performDelete);
 
 module.exports = router;