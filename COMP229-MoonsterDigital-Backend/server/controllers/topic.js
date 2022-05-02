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
const topic = require('../models/topic');
let router = express.Router();
let alert = require('alert');

//importing model
let Topic = require('../models/topic');

// displaying list method
module.exports.displayTopics = (req, res, next) => {

    let query = Topic.find();
    query.exec((err, topicList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(topicList);
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {

    res.json({success: true, msg: 'Succesfully Displayed Add Page'});
}

// POST process the topic Details page and create new topic - CREATE
module.exports.processAddPage = (req, res, next) => {

    try{
        let addTopic = topic({
            "topicTitle" : req.body.topicTitle,
            "date": req.body.date,
            "content" : req.body.content,
            "username" : req.body.username,
        });

        topic.create(addTopic, (err, topic) =>{
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                res.json({success: true, msg: 'Successfully Added New Topic'});
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

    Topic.findById(id, (err, topicToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Displayed Topic to Edit', topic: topicToEdit});
        }
    });
}

// POST process the edit page - updateOne
module.exports.processEditPage = (req, res, next) => {
    
    let id = req.params.id

    let updatedTopic = Topic({
        _id: req.body.id,
        topicTitle : req.body.topicTitle,
        date: req.body.date,
        content : req.body.content,
        username : req.body.username,
    });

    Topic.updateOne({_id: id}, updatedTopic, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Edited Topic', topic: updatedTopic});
        }
    });
    
}