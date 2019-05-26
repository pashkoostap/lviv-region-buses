const mongoose = require('mongoose');
const { dbUrl } = require('../config');
const { saveRouteVehicles } = require('../models/routeVehicles');

mongoose.connect(dbUrl);

saveRouteVehicles();
