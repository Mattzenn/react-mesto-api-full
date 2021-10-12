import logo from '../images/logo.svg';
import Info from "./Info"
import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
    const location = useLocation()

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"></img>
      {
        loggedIn ?
        <Info email={email} loggedIn={loggedIn} onSignOut={onSignOut} /> :
        (<>
          {
            location.pathname === '/sign-up' ? 
            <Link className='header__link' to='/sign-in'>Регистрация</Link> :
            <Link className='header__link' to='/sign-up'>Войти</Link>
          }
        </>)
      }
    </header>
  )
}

export default withRouter(Header)