const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.use('/', require('./auth'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
