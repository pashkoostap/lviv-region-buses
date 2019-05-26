const mongoose = require('mongoose');

const RouteStopSchema = new mongoose.Schema({
  AddressId: Number,
  Code: String,
  DistanceFromPrev: Number,
  DistanceFromStart: Number,
  Id: Number,
  Name: String,
  OrderPoint: Number,
  RouteId: Number,
  X: Number,
  Y: Number,
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RouteStopSchedule' }]
});
const RouteStop = mongoose.model('RouteStop', RouteStopSchema);

module.exports = { RouteStop, RouteStopSchema };
