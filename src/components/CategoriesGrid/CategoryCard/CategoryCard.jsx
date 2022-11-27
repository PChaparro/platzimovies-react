import { Link } from 'react-router-dom';

import Styles from './CategoryCard.module.css';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      className={Styles.category}
      aria-label={`Discover ${category.category} movies`}
      to={`/category/${category.id}`}
      state={{ name: category.category, color: category.color }}
    >
      <div className={Styles.category__color} style={{ backgroundColor: category.color }}></div>
      <p className={Styles.category__text}>{category.category}</p>
    </Link>
  );
};
