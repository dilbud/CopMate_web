const express = require("express");
const driverModel = require("../models/driverModel");

const driverSignupController = require("../controller/driverSignupController");
const driverRouter = express.Router();

// userRouter.post('/login',loginController);
driverRouter.post(
  "/signup",
  (req, res, next) => {
    console.log(req, "****************************");
    next();
  },
  driverSignupController
);
// userRouter.post('/profile', loginController);

// userRouter.post('/profile', function (req, res, next) {
//   console.log('user.js(routes)');
//       try {
//           userModel.find({}, '-password').exec().then((val) => {
//               res.status(200).json({
//                   msg: 'ok',
//                   serverData: val
//               });
//           }).catch((error) => {
//               return res.status(500).json({ msg: 'internal server error' });
//           });
//       } catch (error) {
//           res.status(500).json({ msg: 'internal server error' });
//       } console.log(userModel);
//   });

// userRouter.post('/profile', (req, res) => {
//   console.log('/profile -> user.js');
//   userModel.find({})
// .exec(function(err,userModel){
//   if(err){
//     console.log("error");
//   }
//   else{
//     res.json(userModel);console.log(userModel);
//   }
// })
// });

driverRouter.route("/").post((req, res) => {
  driverModel.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log(data);
    }
  });
});

// userRouter.route('/profile/:id').get((req, res,next) => {
//   userModel.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data);console.log(data)
//     }
//   })
// })

console.log("routes -> driver.js");

module.exports = driverRouter;
