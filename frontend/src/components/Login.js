import React, { useState } from 'react';

function Login({ onSubmit }) {
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
    onSubmit(data)
  }

  return (
    <section className="login">
      <p className="login__title">Вход</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          required
          className="login__input"
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          required
          className="login__input"
          type="password"
          placeholder="Пароль"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="login__button">Войти</button>
      </form>
    </section>
  )
}

export default Login;