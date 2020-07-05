var express = require('express');
var router = express.Router();

const copModel = require('../models/copModel');

router.post('/addCop', (req, res) => {
    const data = req.body.data;
    console.log(data);
    try {
        copModel.create(data).then((val) => {
            res.status(200).json({ msg: 'user created' });
        }).catch((error) => {
            res.status(500).json({ msg: 'internal server error' });
        });
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' });
    }
});

router.post('/copList', function (req, res, next) {

    copModel.find({}, '-password', (err, user) => {
        if (err) {
            return res.status(500).json({ msg: 'internal server error' });
        } else {
            res.status(200).json({
                msg: 'ok',
                serverData: user
            });
        }
    });
});

router.post('/report', function (req, res, next) {
    res.send('dddddddddd');
});

module.exports = router;
