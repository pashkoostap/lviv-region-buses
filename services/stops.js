const mongoose = require('mongoose');
const { dbUrl } = require('../config');
const { saveStops } = require('../models/stops');

mongoose.connect(dbUrl);

saveStops();
