const mongoose = require('mongoose');
const { dbUrl } = require('../config');
const { saveVehicles } = require('../models/vehicles');

mongoose.connect(dbUrl);

saveVehicles();
