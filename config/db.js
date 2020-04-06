const mongoose = require('mongoose');
const config = require('config');

const uri = config.get('mongouri');

const connectionToDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Connected to DB..');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectionToDB;
