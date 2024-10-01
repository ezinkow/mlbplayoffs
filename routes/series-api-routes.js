// Requiring our models
const { Series } = require("../models");


module.exports = function (app) {

    // Get everything in Series table
    app.get("/api/series", function (req, res) {
        Series.findAll({})
            .then(function (dbseries) {
                res.json(dbseries)
            })
    });

    // Find series where series_round = __
    // app.get('/api/series/:round', function (req, res) {
    //     console.log('req params', req.params)
    //     Series.findAll({
    //         where: {
    //             series_round: req.params.round
    //         }
    //     })
    //         .then(function (dbseries) {
    //             res.json(dbseries)
    //         })
    //         console.log(req.params)
    // });

    // Get series status
    app.get('/api/series/:status', function (req, res) {
        console.log('req params', req.params)
        Series.findAll({
            where: {
                status: req.params.status
            }
        })
            .then(function (dbseries) {
                res.json(dbseries)
            })
            console.log(req.params)
    })
}

