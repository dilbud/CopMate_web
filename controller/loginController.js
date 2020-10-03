const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const SHA256 = require('crypto-js/sha256');
const jwtKey = require('../config/key').jwtKey;

// login with local email name password
module.exports = (req, res) => {
    try {
        const hash = SHA256(req.body.password).toString();
        userModel
            .findOne({ email: req.body.email, password: req.body.password })
            .select('-password')
            .exec()
            .then((user) => {
                if (user == null) {
                    res.status(404).json({ msg: 'user does not exist' });
                } else if (user.active === false) {
                    jwt.sign({ id: user._id, userData: user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                        if (err) {
                            res.status(500).json({ msg: 'internal server error' });
                        } else {
                            res.status(200).json({
                                msg: 'exist',
                                token: token,
                                serverData: user
                            });
                        }
                    });
                } else {
                    res.status(404).json({ msg: 'blocked by Administrator' });
                }
            })
            .catch((err) => {
                res.status(500).json({ msg: 'internal server error' });
            });
    } catch (error) {
        res.status(500).json({ msg: 'internal server error' });
    }
};
