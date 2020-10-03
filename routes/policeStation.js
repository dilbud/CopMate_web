var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

const copModel = require('../models/copModel');

router.post('/addCop', (req, res) => {
  try {
    const data = req.body.data;
    copModel
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

router.post('/copUpdate', (req, res) => {
  try {
    const data = req.body.data;
    copModel
      .findOneAndUpdate({ _id: data.uId }, { ...data.data }, { new: true })
      .select({ password: 0 })
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

router.post('/copList', function (req, res, next) {
  try {
    copModel
      .find({}, '-password')
      .exec()
      .then((val) => {
        res.status(200).json({
          msg: 'ok',
          serverData: val,
        });
      })
      .catch((error) => {
        return res.status(500).json({ msg: 'internal server error' });
      });
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.post('/report', function (req, res, next) {
  try {
    const time = req.body.data.time;
    const policeStation = req.body.data.policeStation;

    console.log(time, policeStation);

    const date = new Date(time);
    const dateString = date.toString();
    const array = dateString.split(' ');
    const fileName = `${array[1]}-${array[2]}-${array[3]}-${policeStation}.pdf`;

    console.log(fileName);

    const doc = new PDFDocument();
    res.setHeader(
      'Content-disposition',
      'attachment; filename="' + fileName + '"'
    );
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);
    doc.text('Hello world!');
    doc.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'internal server error' });
  }
});

module.exports = router;
