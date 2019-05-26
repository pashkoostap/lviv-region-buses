const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
  Id: Number,
  Name: String,
  Code: String,
  X: Number,
  Y: Number
});
const Stop = mongoose.model('Stop', StopSchema);

module.exports = { Stop, StopSchema };
