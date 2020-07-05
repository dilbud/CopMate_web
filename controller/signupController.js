const userModel = require('../models/userModel');
const SHA256 = require('crypto-js/sha256');

module.exports = (req, res) => {
    const data = req.body.data;
    console.log(data);
    try {
        userModel.create(data).then((val) => {
            res.status(200).json({ msg: 'user created' });
        }).catch((error) => {
            res.status(500).json({ msg: 'internal server error' });
        });
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' });
    }
}