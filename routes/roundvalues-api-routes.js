// Requiring our models
const { Roundvalues } = require("../models");


module.exports = function (app) {

    // Get everything in Roundvalues table
    app.get("/api/roundvalues", function (req, res) {
        Roundvalues.findAll({})
            .then(function (dbroundvalues) {
                res.json(dbroundvalues)
            })
    });

    // Find roundvalues where id = __
    app.get('/api/roundvalues/:active_round', function (req, res) {
        Roundvalues.findAll({
            where: {
                active_round: req.params.active_round
            }
        })
            .then(function (dbroundvalues) {
                res.json(dbroundvalues)
            })
        console.log(req.params)
    })
}