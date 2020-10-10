var express = require('express');
var router = express.Router();

const licenseModel = require('../models/licenseModel');
const fineModel = require('../models/fineModel');

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

router.post('/setFine', (req, res) => {
  try {
    const driverNIC = req.body.current.Fine.nic;
    const driverLicenseId = req.body.current.Fine.licenseId;
    const driverName = req.body.current.Fine.name;

    const policeId = req.body.current.Auth.userId;
    const policeStation = req.body.current.Auth.user.policeStation;

    const fine = req.body.list;

    fineModel
      .create({
        driverNIC,
        driverLicenseId,
        driverName,
        policeId,
        policeStation,
        fine,
      })
      .then((val) => {
        res.status(200).json({ msg: 'fine gen' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
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
