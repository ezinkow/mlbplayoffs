// Requiring our models
const { Picks } = require("../models");


module.exports = function (app) {

    // Get everything in Picks table
    app.get("/api/picks", function (req, res) {
        Picks.findAll({})
            .then(function (dbpicks) {
                res.json(dbpicks)
            })
    });

    // Post new picks to picks table
    app.post("/api/picks", function (req, res) {
        Picks.create({
            name: req.body.name,
            series_id: req.body.series_id,
            pick: req.body.pick,
            series_round: req.body.series_round,
            points: req.body.points,
            games: req.body.games
        })
            .then(function (dbpicks) {
                res.json(dbpicks)
            })
    });

    // Find picks where round = __
    app.get('/api/picks/:make_visible', function (req, res) {
        console.log('req params', req.params)
        Picks.findAll({
            where: {
                make_visible: req.params.make_visible
            }
        })
            .then(function (dbpicks) {
                res.json(dbpicks)
            })
        console.log(req.params)
    });

    // Find picks where set to visible
    app.get('/api/picks/:make_visible', function (req, res) {
        console.log('req params', req.params)
        Picks.findAll({
            where: {
                game_date: req.params.date
            }
        })
            .then(function (dbpicks) {
                res.json(dbpicks)
            })
        console.log(req.params)
    })

    // // Find picks where id = __
    // app.get('/api/picks/:id', function (req, res) {
    //     Picks.findAll({}
    //     )
    //         .then(function (dbpicks) {
    //             res.json(dbpicks)
    //         })
    //     console.log(req.params)
    // })



}