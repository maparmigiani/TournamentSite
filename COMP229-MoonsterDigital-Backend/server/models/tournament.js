/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 10th 2022
 * @CourseName Web Application Development SEC005
 */


  
 const mongoose = require('mongoose');
 
 const TournamentModel = mongoose.Schema({
  owner : String,
  title : String,
  description : String,
  isActive :Boolean,
  isCompleted : Boolean,
  players :String,
  startDate : Date,
  endDate :Date,
  rounds : String,
  isActive :Boolean,
},  
{
  collection: "tournaments"
})
 
 module.exports = mongoose.model('tournament', TournamentModel);
