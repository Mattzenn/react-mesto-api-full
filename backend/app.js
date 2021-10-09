const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// const myCors = require('./middlewares/myCors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/validate');
// eslint-disable-next-line import/order
const helmet = require('helmet');

// origin: ['http://mattzenn.nomoredomains.club', 'https://mattzenn.nomoredomains.club', 'localhost:3001', 'http://api.mattzenn.nomoredomains.club', 'https://api.mattzenn.nomoredomains.club']

// app.use(myCors);

app.use(cors());
app.options('*', cors());
// app.use(cors({
//   origin: "*",
//   methods: ['GET', 'POST','PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

const app = express();
const NotFound = require('./errors/NotFound');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

// eslint-disable-next-line import/order
const rateLimit = require('express-rate-limit');
const myCors = require('./middlewares/myCors');



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);
app.use(helmet());

// app.use('*', cors(options));

// app.use(cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.post('/signup', userValidation, createUser);
app.post('/signin', loginValidation, login);

app.use('/', auth, usersRouter);

app.use('/', auth, cardsRouter);

app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

// подключаемся к серверу mongo
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка' : message,
    });

    console.log({ err });

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodbnew');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listeningnpm run dev  on port ${PORT}`);
});
