/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 27th 2022
 * @CourseName Web Application Development SEC005
 */


  
const mongoose = require('mongoose');
 
const TopicModel = mongoose.Schema({
    topicTitle:
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
    {   type: String,
        default: '',
        trim: true,
        required: 'username is required'
    }
},
{
    collection: "topics"
})
 
 module.exports = mongoose.model('topic', TopicModel);
