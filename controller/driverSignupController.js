const driverModel = require('../models/driverModel');
const SHA256 = require('crypto-js/sha256');

module.exports = (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        driverModel.create(data).then((val) => {
            res.status(200).json({ msg: 'user created' });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({ msg: 'internal server error' });
        });
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' });
    }
}