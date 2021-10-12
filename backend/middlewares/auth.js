const jwt = require('jsonwebtoken');
const Auth = require('../errors/Auth');

const { NODE_ENV, JWT_SECRET } = process.env;

const BearerToken = function (header) {
  return header.replace('Bearer ', '');
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Auth('Необходима авторизация');
  }

  const token = BearerToken(authorization);

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }
  req.user = payload;

  next();
};

module.exports = auth;
