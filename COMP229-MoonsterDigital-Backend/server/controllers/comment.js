/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

//importing modules
let express = require('express');
let mongoose = require('mongoose');
const comment = require('../models/comment');
let router = express.Router();
let alert = require('alert');

//importing model
let Comment = require('../models/comment');

// displaying list method
module.exports.displayComments = (req, res, next) => {

    let query = Comment.find();
    query.exec((err, commentList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(commentList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {

    res.json({success: true, msg: 'Succesfully Displayed Add Comment'});
}

// POST process the comment Details page and create new comment - CREATE
module.exports.processAddPage = (req, res, next) => {

    try{
        let addComment = comment({
            "topicId" : req.body.topicId,
            "title" : req.body.title,
            "date": req.body.date,
            "content" : req.body.content,
            "username" : req.body.username,
        });

        comment.create(addComment, (err, comment) =>{
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                res.json({success: true, msg: 'Successfully Added New Comment'});
            }
        });
    }

     catch (e){
         console.log(e);
         res.send(e);
     }
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Comment.findById(id, (err, commentToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Displayed Comment to Edit', comment: commentToEdit});
        }
    });
}

// POST process the edit page - updateOne
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id

    let updatedComment = Comment({
        _id: req.body.id,
        topicId : req.body.topicId,
        title : req.body.title,
        date: req.body.date,
        content : req.body.content,
        username : req.body.username,
    });

    Comment.updateOne({_id: id}, updatedComment, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Comment', comment: updatedComment});
        }
    });

}