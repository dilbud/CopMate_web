var express = require('express');
var router = express.Router();

const licenseModel = require('../models/licenseModel');

router.post('/addLicense', (req, res) => {
  try {
    const data = req.body.data;
    licenseModel
      .create(data)
      .then((val) => {
        res.status(200).json({ msg: 'user created' });
      })
      .catch((error) => {
        res.status(500).json({ msg: 'internal server error' });
      });
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.post('/licenseUpdate', (req, res) => {
  try {
    const data = req.body.data;
    licenseModel
      .findOneAndUpdate({ _id: data.lId }, { ...data.data }, { new: true })
      .select({})
      .exec()
      .then((val) => {
        res.status(200).json({ msg: 'updated', serverData: val });
      })
      .catch((error) => {
        res.status(500).json({ msg: 'internal server error' });
      });
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.post('/licenseList', function (req, res, next) {
  try {
    let filter = req.body.filter;
    let array = [];

    switch (filter.trim()) {
      case 'active':
        array.push({ active: true });
        break;
      case 'inactive':
        array.push({ active: false });
        break;
      default:
        array = [
          { name: { $regex: filter, $options: 'i' } },
          { nic: { $regex: filter, $options: 'i' } },
          { licenseId: { $regex: filter, $options: 'i' } },
        ];
        break;
    }

    licenseModel
      .find({
        $or: array,
      })
      .exec()
      .then((val) => {
        res.status(200).json({
          msg: 'ok',
          serverData: val,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ msg: 'internal server error' });
      });
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
  }
});

module.exports = router;
