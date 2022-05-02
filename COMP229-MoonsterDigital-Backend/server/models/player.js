/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Apr 8th 2022
 * @CourseName Web Application Development SEC005
 */

const mongoose = require('mongoose');
 
const PlayerModel = mongoose.Schema({
    tournamentId:
    {
        type: String,
        default: '',
        trim: true,
        required: 'tournament id is required'
    },
    number: // use 1, 2, 3, 4, 5, 6, 7, 8 to fill the 8-player tournament
    {
        type: Number,
        default: 0,
        trim: true,
        required: 'position is required'
    },
    /*username: // username is skipped to make it simplier to implement
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },*/
    displayName:
    {
        type: String,
        default: '',
        trim: true,
        required: 'display name is required'
    }
},
{
    collection: "players"
})
  
module.exports = mongoose.model('player', PlayerModel); 