const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  RouteCode: String,
  RouteId: Number,
  RouteName: String,
  ActualOnDate: String,
  IterationEnd: String,
  IterationStart: String,
  StartPoint: mongoose.Schema.Types.Mixed,
  EndPoint: mongoose.Schema.Types.Mixed,
  TimeToPoint: Number,
  State: Number,
  VehicleId: Number,
  VehicleName: String,
  LowFloor: Boolean,
  Angle: Number,
  X: Number,
  Y: Number
});
const Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = { Vehicle, VehicleSchema };
