var express = require('express');
const PDFDocument = require('pdfkit');
const { findById, findOneAndUpdate } = require('../models/fineModel');
const fineModel = require('../models/fineModel');
var router = express.Router();

// router.post('/getFine', (req, res) => {
//   try {
//     const data = req.body.data;
//   } catch (error) {
//     res.status(500).json({ msg: 'internal server error' });
//   }
// });

function generateHeader(doc) {
  doc.fontSize(20).text('CopMate', 110, 57).moveDown();
}

function generateCustomerInformation(doc, val) {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);
  generateHr(doc, 185);
  const customerInformationTop = 200;
  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
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
    .moveDown();

  generateHr(doc, 275);
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
    .fontSize(8)
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

router.get('/setFine/:fine', (req, res) => {
  try {
    const data = req.params.fine;

    fineModel
      .findOneAndUpdate(
        { $and: [{ _id: data }] },
        { $set: { isPaid: true } },
        { new: true }
      )
      .exec()
      .then((val) => {
        console.log(val);
        var doc = new PDFDocument({ bufferPages: true });
        console.log(__dirname);
        // doc.registerFont('Car', __dirname + '/iskpota.ttf');
        doc.pipe(res);
        generateHeader(doc);
        generateCustomerInformation(doc, val);
        generateInvoiceTable(doc, val);
        // generateFooter(doc);
        doc.end();
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ msg: 'internal server error' });
      });
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.post('/fineList', function (req, res, next) {
  try {
    let filter = req.body.filter;
    let array = [];

    switch (filter.trim()) {
      //   case 'active':
      //     array.push({ active: true });
      //     break;
      //   case 'inactive':
      //     array.push({ active: false });
      //     break;
      default:
        array = [
          { driverNIC: { $regex: filter, $options: 'i' } },
          { driverLicenseId: { $regex: filter, $options: 'i' } },
          { driverName: { $regex: filter, $options: 'i' } },
        ];
        break;
    }

    fineModel
      .find({
        $and: [{ $or: array }, { isPaid: false }],
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
