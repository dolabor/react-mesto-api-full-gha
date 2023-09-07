const jwt = require('jsonwebtoken');
const { UnauthorisedError } = require('../utils/errors/errors');

const config = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorisedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    throw new UnauthorisedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
