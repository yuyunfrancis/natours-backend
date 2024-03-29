const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('../../config/dbConnection');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

connectDb();
const port = process.env.PORT || 3000;

// Read json file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == '--import') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
}
