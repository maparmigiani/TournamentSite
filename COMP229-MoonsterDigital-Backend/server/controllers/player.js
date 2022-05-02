/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Apr 8th 2022
 * @CourseName Web Application Development SEC005
 */

//importing modules
let express = require('express');
let mongoose = require('mongoose');
const player = require('../models/player');

//importing model
let Player = require('../models/player');
let Tournament = require('../models/tournament');

// displaying list method
module.exports.displayPlayers = (req, res, next) => {

    let query = Player.find();
    query.exec((err, playerList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(playerList);
        }
    });
}

module.exports.getDisplayNames = (req, res, next) => {
    let requestedTournamentId = req.params.id;
    let query = Player.aggregate(
        [
            { $sort: { "number": 1 } },
            { $match: { "tournamentId": requestedTournamentId } },
            { $group: { "_id": "$tournamentId", "players": { $push: "$displayName" } } },
        ]
    );

    /*let query = Player.aggregate([
        {
            "$project": {
              "_tournamentId": {
                "$toObjectId": "$tournamentId"
              }
            }
        },
        {
            "$lookup": {
                "from": "tournaments",
                "localField": "_tournamentId",
                "foreignField": "_id",
                "as": "tournament"
            }
        }
     ]);*/

    query.exec((err, displayNameList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(displayNameList);
        }
    });
}

module.exports.processUpsertPage = async (req, res, next) => {
    try {

        const response = await Player.findOneAndUpdate(
            { tournamentId: req.body.tournamentId, number: req.body.number }, // filter
            { displayName: req.body.displayName }, // update
            {
                new: true,
                upsert: true
            }
        );

        res.json(response); // return updated player
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}

// bulk write - upsert
module.exports.displayBulkUpsertPage = async (req, res, next) => {
    let query = Tournament
        .aggregate([
            {
                "$project": {
                    "tournamentId": {
                        "$toString": "$_id"
                    }
                }
            },
            {
                "$lookup": {
                    "from": "players",
                    "localField": "tournamentId",
                    "foreignField": "tournamentId",
                    "as": "registeredPlayers"
                }
            },
            {
                "$project": {
                    "tournamentId": 1,
                    "player1": { "$arrayElemAt": ["$registeredPlayers.displayName", 0]},
                    "player2": { "$arrayElemAt": ["$registeredPlayers.displayName", 1]},
                    "player3": { "$arrayElemAt": ["$registeredPlayers.displayName", 2]},
                    "player4": { "$arrayElemAt": ["$registeredPlayers.displayName", 3]},
                    "player5": { "$arrayElemAt": ["$registeredPlayers.displayName", 4]},
                    "player6": { "$arrayElemAt": ["$registeredPlayers.displayName", 5]},
                    "player7": { "$arrayElemAt": ["$registeredPlayers.displayName", 6]},
                    "player8": { "$arrayElemAt": ["$registeredPlayers.displayName", 7]}
                }
            },
        ]);

    query.exec((err, tournamentList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.json(tournamentList);
        }
    });
}

// bulk write - upsert
module.exports.processBulkUpsertPage = async (req, res, next) => {
    try {

        const response = await Player.bulkWrite([
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 1 },
                    update: { displayName: req.body.player1 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 2 },
                    update: { displayName: req.body.player2 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 3 },
                    update: { displayName: req.body.player3 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 4 },
                    update: { displayName: req.body.player4 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 5 },
                    update: { displayName: req.body.player5 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 6 },
                    update: { displayName: req.body.player6 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 7 },
                    update: { displayName: req.body.player7 },
                    upsert: true
                }
            },
            {
                updateOne: {
                    filter: { tournamentId: req.body.tournamentId, number: 8 },
                    update: { displayName: req.body.player8 },
                    upsert: true
                }
            }
        ]);

        console.log(response)
        if (response.result.ok == 1) {
            //res.json({ success: true, msg: 'Successfully Edited Players' });
            next();
        }
        else {
            res.json({ success: false, msg: 'Failed to Edit Players' });
        }
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
}