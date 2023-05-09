require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const { errors, celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const app = express();

const handleErrors = require('./middlewares/errors');
// const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { createUser, login } = require('./controllers/users');
// const NotFoundError = require('./errors/not-found-error');
// const usersRouter = require('./routes/users');
// const cardsRouter = require('./routes/cards');
// const { regExpLink } = require('./utils/regExpLink');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const allowedCors = [
  'https://mesto.l9llika.nomoredomains.monster',
  'http://mesto.l9llika.nomoredomains.monster',
  'https://api.mesto-l9llika.nomoredomains.monster',
  'http://api.mesto-l9llika.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
  origin: allowedCors,
  optionSuccesStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Access-Control-Allow-Origin', 'Content-type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('db conected');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(limiter);

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//     avatar: Joi.string().pattern(regExpLink),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), createUser);

// app.use(auth);

// app.use('/users', usersRouter);
// app.use('/cards', cardsRouter);
app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT);
// scp -r ./backend2/* l9llika@158.160.61.148:/home/l9llika/backend
// scp -r ./build/* l9llika@158.160.61.148:/home/l9llika/frontend
