const mongoose = require('mongoose');

const RouteStopScheduleSchema = new mongoose.Schema({
  ActualOnDate: String,
  Angle: Number,
  EndPoint: mongoose.Schema.Types.Mixed,
  IterationEnd: mongoose.Schema.Types.Mixed,
  IterationStart: mongoose.Schema.Types.Mixed,
  LowFloor: Boolean,
  RouteCode: mongoose.Schema.Types.Mixed,
  RouteId: Number,
  RouteName: String,
  StartPoint: mongoose.Schema.Types.Mixed,
  State: Number,
  TimeToPoint: Number,
  VehicleId: Number,
  VehicleName: mongoose.Schema.Types.Mixed,
  X: Number,
  Y: Number
});

const RouteStopSchedule = mongoose.model(
  'RouteStopSchedule',
  RouteStopScheduleSchema
);

module.exports = { RouteStopSchedule, RouteStopScheduleSchema };
