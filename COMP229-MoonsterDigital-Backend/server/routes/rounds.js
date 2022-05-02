/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 10th 2022
 * @CourseName Web Application Development SEC005
 */


 var express = require('express');
 var router = express.Router();
 let jwt = require('jsonwebtoken');
 let passport = require('passport');

 let roundsController = require('../controllers/rounds');
 
 /** GET route to home */
 router.get('/list', roundsController.displayRounds);
 router.get('/:id', roundsController.getRound);
 router.post('/upsert-semiFinals', passport.authenticate('jwt', {session: false}), roundsController.processUpsertSemiFinal);
 router.post('/upsert-finals', passport.authenticate('jwt', {session: false}), roundsController.processUpsertFinal);
 router.post('/upsert-winner', passport.authenticate('jwt', {session: false}), roundsController.processUpsertWinner); 

 module.exports = router;
 