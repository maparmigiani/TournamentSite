/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 10th 2022
 * @CourseName Web Application Development SEC005
 */

//importing modules
let express = require('express');
let mongoose = require('mongoose');
const tournament = require('../models/tournament');
let router = express.Router();
let alert = require('alert');

//importing model
let Tournament = require('../models/tournament');
let RoundsModel = require('../models/rounds');
let PlayerModel = require('../models/player');

module.exports.getPlayersFromTournament = async (req, res, next) => {
    console.log("Entered getPlayer ");

    try {

        const players = await PlayerModel.find({ tournamentId: req.body.tournamentId }).exec();
        console.log("Tournament ID: ", req.body.tournamentId);

        //console.log(players);
        upsertRounds(players, req.body.tournamentId);
        res.json({ success: true, msg: 'Successfully Edited Players' });
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}

async function upsertRounds(playersArray, tournamentId) {
    //-------Dev Test-------
    console.log("upsertRounds", playersArray);
    try {
        //_id, tournamentId, number,displayName
        const filter = { TournamentId: tournamentId };
        const update = {
            "QuarterFinal.team1": playersArray[0],
            "QuarterFinal.team2": playersArray[1],
            "QuarterFinal.team3": playersArray[2],
            "QuarterFinal.team4": playersArray[3],
            "QuarterFinal.team5": playersArray[4],
            "QuarterFinal.team6": playersArray[5],
            "QuarterFinal.team7": playersArray[6],
            "QuarterFinal.team8": playersArray[7],
        };

        // `doc` is the document _after_ `update` was applied because of
        // `returnOriginal: false`
        let doc = await RoundsModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });

        console.log("Quarters created/updated");
        console.log(doc);
    }
    catch (e) {
        console.log("There was an error: ");
        console.log(e);
    }
}

module.exports.processUpsertSemiFinal = async (req, res, next) => {
    console.log("processUpsertSemiFinal");

    let team1, team2, team3, team4;

    try 
    {
        const players = await RoundsModel.find({ TournamentId: req.body.tournamentId }).exec();

        console.log("Tournament ID: ", req.body.tournamentId);
        console.log("These are the players: ", players);
        console.log(req.body);

        // #region Selecting_Semis_Teams
        //Selecting team 1 of semi final
        if (req.body.team1 == 'one') {
            team1 = players[0].QuarterFinal.team1[0];
        } else {
            team1 = players[0].QuarterFinal.team2[0];
        }

        //Selecting team 2 of semi final
        if (req.body.team2 == 'one') {
            team2 = players[0].QuarterFinal.team3[0];
        } else {
            team2 = players[0].QuarterFinal.team4[0];
        }

        //Selecting team 3 of semi final
        if (req.body.team3 == 'one') {
            team3 = players[0].QuarterFinal.team5[0];
        } else {
            team3 = players[0].QuarterFinal.team6[0];
        }

        //Selecting team 4 of semi final
        if (req.body.team4 == 'one') {
            team4 = players[0].QuarterFinal.team7[0];
        } else {
            team4 = players[0].QuarterFinal.team8[0];
        }

        console.log("Semi-Team1: ", team1);
        console.log("Semi-Team2: ", team2);
        console.log("Semi-Team3: ", team3);
        console.log("Semi-Team4: ", team4);
        // #endregion

        // #region Upserting_Semis_Teams
        const filter = { TournamentId: req.body.tournamentId };
        const update = {
            "SemiFinal.team1": team1,
            "SemiFinal.team2": team2,
            "SemiFinal.team3": team3,
            "SemiFinal.team4": team4,
        };

        let doc = await RoundsModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        //#endregion

        res.json(JSON.stringify(players));
    }
    catch (e) {
        console.log("There was an error: ");
        console.log(e);
    }
}

module.exports.processUpsertFinal = async (req, res, next) => {
    console.log("processUpsertFinal");

    let team1, team2;

    try 
    {
        const players = await RoundsModel.find({ TournamentId: req.body.tournamentId }).exec();

        console.log("Tournament ID: ", req.body.tournamentId);

        console.log("These are the players: ", players);

        // #region Selecting_Semis_Teams
        //Selecting team 1 of semi final
        if (req.body.team1 == 'one') {
            team1 = players[0].SemiFinal.team1[0];
        } else {
            team1 = players[0].SemiFinal.team2[0];
        }

         //Selecting team 1 of semi final
         if (req.body.team2 == 'one') {
            team2 = players[0].SemiFinal.team3[0];
        } else {
            team2 = players[0].SemiFinal.team4[0];
        }

        console.log("Final-Team1: ", team1);
        console.log("Final-Team2: ", team2);
       
        // #endregion

        // #region Upserting_Semis_Teams
        const filter = { TournamentId: req.body.tournamentId };
        const update = {
            "Final.team1": team1,
            "Final.team2": team2,        
        };

        let doc = await RoundsModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        //#endregion

        res.json(JSON.stringify(players));
    }
    catch (e) 
    {
        console.log("There was an error: ");
        console.log(e);
    }
}

module.exports.processUpsertWinner = async (req, res, next) => {
    console.log("processUpsertWinner");

    let team1;

    try 
    {
        const players = await RoundsModel.find({ TournamentId: req.body.tournamentId }).exec();

        console.log("Tournament ID: ", req.body.tournamentId);

        console.log("These are the players: ", players);

        // #region Selecting_Semis_Teams
        //Selecting team 1 of semi final
        if (req.body.team1 == 'one') {
            team1 = players[0].Final.team1[0];
        } else {
            team1 = players[0].Final.team2[0];
        }

        console.log("Winner Team: ", team1);
       
        // #endregion

        // #region Upserting_Semis_Teams
        const filter = { TournamentId: req.body.tournamentId };
        const update = {
            "Winner": team1
        };

        let doc = await RoundsModel.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // Make this update into an upsert
        });
        //#endregion

        res.json(JSON.stringify(players));
    }
    catch (e) 
    {
        console.log("There was an error: ");
        console.log(e);
    }
}

// displaying list method
module.exports.displayRounds = (req, res, next) => {
    console.log("Display rounds Route");
    let query = RoundsModel.find();
    query.exec((err, rounds) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(rounds);
        }
    });
}

// displaying list method
module.exports.getRound = (req, res, next) => {
    let id = req.params.id; 
    let query = RoundsModel.find({TournamentId: id});
    query.exec((err, rounds) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(rounds);
        }
    });
}