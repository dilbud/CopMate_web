const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect('mongodb+srv://copAdmin:X9eCUnWYSESt3512@cluster0-7g5ox.mongodb.net/CopMate?retryWrites=true&w=majority', options);
exports.connection = () => {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connection successful');
  });
}
