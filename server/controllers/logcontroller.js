let router = require('express').Router();
const { Router } = require('express');
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let LogModel = sequelize.import('../models/log');

router.get('/log', function (req, res) {
    let userid = req.user.id;

    LogModel
        .findAll({
            where: { owner: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

router.post('/log', function (req, res) {
    let description = req.body.description;
    let definition = req.body.definition;
    let result = req.body.result;
    let owner_id = req.user.id;

    LogModel
        .create({
            description: description,
            definition: definition,
            result: result,
            owner_id: owner_id
        })
        .then(
            function createSuccess(data) {
                res.json({
                    data: data
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

router.get('/log/:id', function(req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    LogModel
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

router.delete('/log/:id', function(req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    LogModel
        .destroy({
            where: { id: data, owner: userid}
        }).then(
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
});

router.put('/update/:id', function(req, res) {
    let data = req.params.id;
    let description = req.body.description;
    let definition = req.body.definition;
    let result = req.body.result;

    LogModel
        .update({
            description: description,
            definition: definition,
            result: result
        },
        {where: {id:data}}
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    description: description,
                    definition: definition,
                    result: result
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

module.exports = router;
