const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  Id: Number,
  Name: String,
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RouteStop' }],
  routeVehicles: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RouteVehicle' }],
    default: []
  }
});
const Route = mongoose.model('Route', RouteSchema);

module.exports = { Route, RouteSchema };
