const mongoose = require('mongoose');

const RouteVehicleSchema = new mongoose.Schema({
  id: String,
  Angle: Number,
  EndPoint: String,
  IterationEnd: mongoose.Schema.Types.Mixed,
  IterationStart: mongoose.Schema.Types.Mixed,
  RouteCode: mongoose.Schema.Types.Mixed,
  RouteId: Number,
  RouteName: String,
  StartPoint: String,
  State: Number,
  TimeToPoint: Number,
  VehicleId: Number,
  VehicleName: String,
  X: Number,
  Y: Number,
  LowFloor: Boolean,
  ActualOnDate: String,
  created: Number
});
const RouteVehicle = mongoose.model('RouteVehicle', RouteVehicleSchema);

module.exports = { RouteVehicle, RouteVehicleSchema };
