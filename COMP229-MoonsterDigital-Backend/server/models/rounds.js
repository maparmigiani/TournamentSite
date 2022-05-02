/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

const mongoose = require('mongoose');
/*
_id, 
tournamentId, 
number,
displayName
 */
const PlayerModel = { id: String, tournamentId: String, number: Number, displayName: String };

const RoundsModel = mongoose.Schema({
    TournamentId: String,
    QuarterFinal: {
        team1: [PlayerModel],
        team2: [PlayerModel],
        team3: [PlayerModel],
        team4: [PlayerModel],
        team5: [PlayerModel],
        team6: [PlayerModel],
        team7: [PlayerModel],
        team8: [PlayerModel],
    },
    SemiFinal: {
        team1: [PlayerModel],
        team2: [PlayerModel],
        team3: [PlayerModel],
        team4: [PlayerModel]
    },
    Final: {
        team1: [PlayerModel],
        team2: [PlayerModel]
    },
    Winner: [PlayerModel]
},
{
    collection: "rounds"
});

module.exports = mongoose.model('rounds', RoundsModel); 