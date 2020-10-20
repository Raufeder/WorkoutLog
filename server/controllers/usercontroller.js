let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


router.post('/user/register', function (req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)

    }).then(
        function createSuccess(user){

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

router.post('/user/login', function(req, res) {

    User.findOne( {where: { username: req.body.user.username}}).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches){
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "you failed, yo"});
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate"});
            }
        },
        function (err) {
            res.status(501).send({error: "you failed, yo"});
        }
    );
});

module.exports = router;