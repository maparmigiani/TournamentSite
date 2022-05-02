/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 10th 2022
 * @CourseName Web Application Development SEC005
 */


var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/** GET route to home */
router.get('/', indexController.displayHomePage);

/** GET route to login */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the login page */
router.post('/login', indexController.processLoginPage);

/** GET route to register */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the register page */
router.post('/register', indexController.processRegisterPage);

/* GET Route for performing UserLogout */
router.get('/logout', indexController.performLogout);

router.post('/logout', indexController.performLogout);





module.exports = router;



