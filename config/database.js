const mongoose = require('mongoose');

const mongoKey = require('./key').mongoKey;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,

};

mongoose.connect(`mongodb+srv://copAdmin:${mongoKey}@cluster0-7g5ox.mongodb.net/CopMate?retryWrites=true&w=majority`, options).catch((error) => {
  console.log('connection error 01:', error);
});
exports.connection = () => {
  try {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error 02:'));
    db.once('open', () => {
      console.log('connection successful');
    });
  } catch (error) {
    console.log('connection error 03:', error);
  }
}
