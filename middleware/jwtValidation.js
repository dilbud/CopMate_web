// var jwt = require('jsonwebtoken');

const jwtKey = require('../config/key').jwtKey;

const jwtValidation = (req, res, next) => {

    next();

    // const authHead = req.headers.authorization;
    // var token = authHead.split(' ')[1];
    // console.log('row token -----',token);
    // jwt.verify(token, key, (err, decode) => {
    //   if(err) {
    //     res.status(401).json({msg: 'please login or signup'})
    //   } else {
    //       const decoded = jwt.decode(token);
    //       next();
    //   }
    // });
  }

  module.exports = jwtValidation;