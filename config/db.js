const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongouri');

const connectionToDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to DB..');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectionToDB;
