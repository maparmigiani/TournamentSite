/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

const mongoose = require('mongoose');
 
const CommentModel = mongoose.Schema({
    topicId:
    {
        type: String,
        default: '',
        trim: true,
        required: 'topic id is required'
    },
    title:
    {
        type: String,
        default: '',
        trim: true,
        required: 'title is required'
    },
    date:
    {
        type: Date,
        default: Date.now
    },
    content:
    {
        type: String,
        default: '',
        trim: true,
        required: 'content is required'
    },
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    }
},
{
    collection: "comments"
})
  
module.exports = mongoose.model('comment', CommentModel); 