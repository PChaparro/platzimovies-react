import { NavLink } from 'react-router-dom';

import Styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={Styles['navbar-container']}>
      <div className={`${Styles.navbar} container`}>
        <NavLink to={'/'}>
          <img className={Styles.navbar__image} src='images/vision-logo.svg' alt='Vision logo' />
        </NavLink>
        <ul className={Styles.navbar__options}>
          <li className={Styles.navbar__option}>
            <NavLink to={'/trendings'}>Trendings</NavLink>
          </li>
          <li className={Styles.navbar__option}>
            <NavLink to={'/'}>Saved</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
