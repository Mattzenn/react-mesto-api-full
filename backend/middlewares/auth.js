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

  console.log(`это тут ${token}`)

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new Auth('Необходима авторизация');
  }
  req.user = payload;


  console.log(`это userid ${req.user._id}`)

  next();
};

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const Auth = require('../errors/Auth');

// const { NODE_ENV, JWT_SECRET } = process.env;

// const auth = (req, res, next) => {
//   const token = req.headers;

//   console.log(`!!!!${token}`)

//   if (!token) {
//     next(new Auth('Ошибка авторизации'))
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
//   } catch (err) {
//     throw new Auth('Необходима авторизация');
//   }
//   req.user = payload;

//   next();
// };

// module.exports = auth;