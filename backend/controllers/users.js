const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const RegistrationError = require('../errors/registration-error');
const AuthError = require('../errors/auth-error');
const { SALT_NUMBER } = require('../utils/constants');

const { JWT_SECRET = 'secret-key' } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные пользователя'));
    } else {
      next(err);
    }
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные пользователя'));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;
    const hash = await bcrypt.hash(password, SALT_NUMBER);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res
      .status(200)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    } else if (err.code === 11000) {
      next(new RegistrationError('Такой пользователь уже существует'));
    } else {
      next(err);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthError('Неправильная почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new AuthError('Неправильная почта или пароль');
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send({
      token,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserInfo,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
