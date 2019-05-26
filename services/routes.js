const mongoose = require('mongoose');
const { dbUrl } = require('../config');
const { saveRoutes } = require('../models/routes');

mongoose.connect(dbUrl);

saveRoutes();
