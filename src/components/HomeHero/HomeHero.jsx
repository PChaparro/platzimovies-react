import Styles from './HomeHero.module.css';

export const HomeHero = () => {
  return (
    <header className={Styles.hero}>
      <div className={`${Styles['hero-content']} container`}>
        <h1 className={Styles.hero__title}>Welcome to vision</h1>
        <p className={Styles.hero__text}>
          Find your favorite movies and explore new ones, all in one place
        </p>
        <a className={Styles.hero__cta} href='#categories'>
          Explore categories{' '}
        </a>
      </div>
    </header>
  );
};
