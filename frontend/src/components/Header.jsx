import React from "react";
import headerLogo from '../images/header-logo.svg';
import {NavLink, useLocation} from "react-router-dom";

function Header({isLoggedIn, handleLogout, authorisedUserEmail}) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Mesto"/>

      {isLoggedIn ? (
        <div className="header__right">
          <div className="header__email-area">
            {authorisedUserEmail}
          </div>
          <NavLink to="/signin" className="header__link" onClick={handleLogout}>
            Выйти
          </NavLink>
        </div>
      ) : (
        <div className="header__right">
          {location.pathname === '/signin' && (
            <NavLink to="/signup" className="header__link">
              Регистрация
            </NavLink>
          )}
          {location.pathname === '/signup' && (
            <NavLink to="/signin" className="header__link">
              Войти
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
