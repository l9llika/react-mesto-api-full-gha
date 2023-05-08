import { Link, Route, Switch } from 'react-router-dom'
import logo from '../images/logo-white.svg'

function Header({ emailUser, onSignOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип проекта Mesto" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/">
          <Link to="/sign-in" className="header__link" onClick={onSignOut}>
            {emailUser} Выйти
          </Link>
          </Route>
      </Switch>
    </header>
  );
}
export default Header