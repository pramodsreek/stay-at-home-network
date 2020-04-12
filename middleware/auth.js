const jwt = require('jsonwebtoken');
//const config = require('config');
require('dotenv').config();

//next callback to run once done to move to next piece of middleware

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  //Check if there is no token
  if (!token) {
    return res.status(401).json({
      msg: 'No token received, authorisation denied',
    });
  }
  //Verify token
  try {
    //const decoded = jwt.verify(token, config.get('jwtSecret'));
    const decoded = jwt.verify(token, process.env['jwtSecret']);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token not valid',
    });
  }
};
