var express = require('express');
var router = express.Router();

router.post('/validLicense', (req, res) => {
  try {
    console.log(req.headers.authorization);
    res.status(200).json({ msg: 'user created' });
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
