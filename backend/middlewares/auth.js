const jwt = require('jsonwebtoken');
const { UnauthorisedError } = require('../utils/errors/errors');

const config = require('../utils/config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorisedError('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, config.jwtSecret);
  } catch (err) {
    throw new UnauthorisedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
