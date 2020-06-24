var express = require('express');
var router = express.Router();
const user = require('../models/userModel');

/* GET users listing. */
router.get('/', function (req, res, next) {

  new user({
    firstName: 'dig',
    lastName: 'HGD',
  }).save((error, data) => {
    if (error) {
      res.json({
        user: error,
      });
    } else {
      res.json({
        user: data,
      });
    }
  });
});

module.exports = router;
