import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ onSubmit }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(data);
  }

  return (
    <section className="register">
      <p className="register__title">Регистрация</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          required
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          className="register__input"
          type="password"
          placeholder="Пароль"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="register__button">Зарегистрироваться</button>
      </form>
      <p className="register__signin">Уже зарегистрированы?
        <Link to="sign-in" className="register__login-link"> Войти</Link>
      </p>
    </section>
  )
}

export default Register;