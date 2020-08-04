var express = require('express');
var router = express.Router();

const userModel = require('../models/userModel');

router.post('/profile', (req, res) => {

    try {
        // const time = req.body.data.time;
        const policeStation = req.body.data.policeStation;
        console.log(policeStation);
        console.log(UserData);
        res.status(200).json({ msg: 'pdf created' });
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' });
    }
});

module.exports = router;