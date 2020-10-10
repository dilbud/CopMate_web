var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');

const copModel = require('../models/copModel');
const fineModel = require('../models/fineModel');

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

function generateHeader(doc) {
  doc.fontSize(20).text('CopMate', 110, 57).moveDown();
}

function generateCustomerInformation(doc, val) {
  doc.fillColor('#444444').fontSize(20).text('Fine Statements', 50, 160);
  generateHr(doc, 185);
  const customerInformationTop = 200;
  doc
    .fontSize(10)
    .text('Fine Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(val._id, 150, customerInformationTop)
    .font('Helvetica')
    .text('License Number:', 50, customerInformationTop + 15)
    .font('Helvetica')
    .text(val.driverLicenseId, 150, customerInformationTop + 15)
    .text('NIC Number:', 50, customerInformationTop + 30)
    .font('Helvetica')
    .text(val.driverNIC, 150, customerInformationTop + 30)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 45)
    .text(formatDate(new Date()), 150, customerInformationTop + 45)
    .text('Amount:', 50, customerInformationTop + 60)
    .text(
      formatCurrency(
        val.fine.reduce((pv, cv) => {
          return pv + +cv.amount;
        }, 0)
      ),
      150,
      customerInformationTop + 60
    )
    .text('Police Station:', 50, customerInformationTop + 75)
    .text(val.policeStation, 150, customerInformationTop + 75)
    .moveDown();

  generateHr(doc, 290);
}

function generateInvoiceTable(doc, val) {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(doc, invoiceTableTop, 'Item', 'Description', 'Line Total');
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < val.fine.length; i++) {
    const item = val.fine[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.id,
      item.state1,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const duePosition = invoiceTableTop + (i + 1) * 30;
  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    duePosition,
    '',
    'Total Amount',
    formatCurrency(
      val.fine.reduce((pv, cv) => {
        return pv + +cv.amount;
      }, 0)
    )
  );
  doc.font('Helvetica');
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      'Payment is due within 15 days. Thank you for your business.',
      50,
      780,
      { align: 'center', width: 500 }
    );
}

function generateTableRow(doc, y, item, description, lineTotal) {
  doc
    .fontSize(10)
    // .font('Car')
    .text(item, 50, y)
    .text(description, 80, y)
    .text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return 'Rs: ' + (cents / 1.0).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}

router.get('/report/:station/:date', function (req, res, next) {
  try {
    // const time = req.body.data.time;
    // const policeStation = req.body.data.policeStation;
    // console.log(time, policeStation);
    // const date = new Date(time);
    // const dateString = date.toString();
    // const array = dateString.split(' ');
    // const fileName = `${array[1]}-${array[2]}-${array[3]}-${policeStation}.pdf`;

    const station = req.params.station;
    const date = req.params.date;

    fineModel
      .find({
        $or: [
          { isPaid: false },
          { policeStation: station },
          { timeEnd: { $lte: date } },
        ],
      })
      .exec()
      .then((val) => {
        console.log(val);
        var doc = new PDFDocument({ bufferPages: true });
        doc.pipe(res);
        // doc.registerFont('Car', __dirname + '/iskpota.ttf');
        val.forEach((v, i) => {
          generateHeader(doc);
          generateCustomerInformation(doc, v);
          generateInvoiceTable(doc, v);
          doc.addPage();
        });

        // // generateFooter(doc);
        doc.end();
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ msg: 'internal server error' });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'internal server error' });
  }
});

module.exports = router;
