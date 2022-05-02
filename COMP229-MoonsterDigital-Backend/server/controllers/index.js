/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 10th 2022
 * @CourseName Web Application Development SEC005
 */


let express = require('express');
let router = express.Router();
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//importing model
let Tournament = require('../models/tournament');
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    //res.render('index', { title: 'Home', displayName: /*req.user ? req.user.displayName :*/ ''});

    // Testing---------------------------------------
    console.log("Entered Home page");
    //End testing-----------------------------------

    // only display the active tournaments
    let query = Tournament.find({ "isActive": true });   //filtering with mongoose method
    query.exec((err, tournamentList) => {               //calling exect method to be able to execute an arrow method using the sorted list
        if (err) {
            return console.error(err);
        }
        else {
            //console.log("entered list page",tournamentList);
            //res.render('index', { title: 'Home', Tournament: tournamentList, displayName: /*req.user ? req.user.displayName :*/ "" });
            res.json(tournamentList);
        }
    });
};

module.exports.displayLoginPage = (req, res, next) => {
    // check if the user is already logged in
    if (!req.user) {
        res.render('auth/login',
            {
                title: "Login",
                messages: req.flash('loginMessage'),
                displayName: req.user ? req.user.displayName : ''
            })
    }
    else {
        return res.redirect('/');
    }
    
    res.json({ success: true, msg: 'Succesfully Displayed Login Page' });
};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            // server err?
            if (err) {
                return next(err);
            }
            // is there a user login error?
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                console.log('Error: User Not Exists!')
                //return res.redirect('/login');
                return res.json({ success: false, msg: 'User Not Exists!'});
            }
            req.login(user, (err) => {
                // server error?
                if (err) {
                    return next(err);
                }

                const payload =
                {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                }

                const authToken = jwt.sign(payload, DB.Secret, {
                    expiresIn: 604800 // 1 week
                });

                return res.json({
                    success: true, msg: 'User Logged in Successfully!', user: {
                        id: user._id,
                        displayName: user.displayName,
                        username: user.username,
                        email: user.email
                    }, token: authToken
                });

                //return res.redirect('/book-list');
            });
        })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    /*if (!req.user) {
        res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
    }
    else {
        return res.redirect('/');
    }*/

    res.json({success: true, msg: 'Succesfully Displayed Register Page'});
};

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
                return res.json({ success: false, msg: 'User Already Exists' });
            }
            /*return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });*/
            return res.json({ success: false, msg: 'Unknown Error' });
        }
        else {
            // if no error exists, then registration is successful

            // redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                //res.redirect('/tournament-list')
                res.json({ success: true, msg: 'Succesfully Registered' });
            });
        }
    });
};

module.exports.performLogout = (req, res, next) => {
    req.logout();
    //res.redirect('/');
    res.json({ success: true, msg: 'User Successfully Logged out!' });
};

module.exports.testRounds = (req, res, next) => {
    req.logout();
    //res.redirect('/');
    res.json({ success: true, msg: 'User Successfully Logged out!' });
};

