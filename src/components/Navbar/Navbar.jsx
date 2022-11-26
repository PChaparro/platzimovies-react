import { NavLink } from 'react-router-dom';
import { FiAlignRight } from 'react-icons/fi';

import Styles from './Navbar.module.css';
import { useRef } from 'react';

export const Navbar = () => {
  const options = useRef(null);

  const toggleMenuVisitibility = () => {
    const element = options.current;
    element.classList.toggle(`${Styles['navbar__options--active']}`);

    element.classList.contains(`${Styles['navbar__options--active']}`)
      ? element.setAttribute('aria-hidden', false)
      : element.setAttribute('aria-hidden', true);
  };

  return (
    <nav className={Styles['navbar-container']}>
      <div className={`${Styles.navbar} container`}>
        <NavLink to={'/'}>
          <img className={Styles.navbar__image} src='/images/vision-logo.svg' alt='Vision logo' />
        </NavLink>
        <ul className={Styles.navbar__options} ref={options}>
          <li className={Styles.navbar__option}>
            <NavLink to={'/trendings'}>Trendings</NavLink>
          </li>
          <li className={Styles.navbar__option}>
            <NavLink to={'/'}>Saved</NavLink>
          </li>
        </ul>
        <FiAlignRight
          className={Styles.navbar__hamburger}
          size={'24px'}
          title={'Toggle mobile menu visibility'}
          onClick={toggleMenuVisitibility}
        />
      </div>
    </nav>
  );
};
