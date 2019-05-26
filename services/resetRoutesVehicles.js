const mongoose = require('mongoose');
const { dbUrl } = require('../config');
const { resetRoutesVehicles } = require('../models/routeVehicles');

mongoose.connect(dbUrl);

resetRoutesVehicles();
