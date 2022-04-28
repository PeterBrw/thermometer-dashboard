const getDashboard = require('../views/dashboard')

exports.getDashboard = (req, res, next) => res.send(getDashboard())