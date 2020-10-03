var express = require('express');
var router = express.Router();

const licenseModel = require('../models/licenseModel');

router.post('/validLicense', (req, res) => {
  try {
    licenseModel
      .findOne({
        $and: [{ nic: req.body.nic }, { licenseId: req.body.licenseId }],
      })
      .exec()
      .then((val) => {
        res.status(200).json({ msg: val });
      })
      .catch((err) => {
        res.status(404).json({ msg: 'user not created' });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.get('/get', (req, res) => {
  try {
    console.log(req.headers.authorization);
    res.status(200).json({ msg: 'user created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'internal server error' });
  }
});

module.exports = router;
