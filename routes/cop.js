var express = require('express');
var router = express.Router();

const copModel = require('../models/copModel');

router.post('/update', (req, res) => {
  console.log(req.body);
  try {
    copModel
      .findOneAndUpdate(
        { $and: [{ _id: req.body.data }, { email: req.body.email }] },
        { $set: { password: req.body.password, pending: false } },
        { new: true }
      )
      .exec()
      .then((val) => {
        console.log(val, '**********************');
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

// router.get('/get', (req, res) => {
//   try {
//     console.log(req.headers.authorization);
//     res.status(200).json({ msg: 'user created' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ msg: 'internal server error' });
//   }
// });

module.exports = router;
