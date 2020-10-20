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
