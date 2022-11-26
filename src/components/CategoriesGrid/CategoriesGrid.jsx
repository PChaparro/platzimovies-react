import { CategoryCard } from './CategoryCard/CategoryCard';

import Styles from './CategoriesGrid.module.css';

export const CategoriesGrid = ({ categories }) => {
  return (
    <div className={Styles.categories}>
      {categories.map((category, index) => {
        return <CategoryCard key={`${category}-card-${index}`} category={category} />;
      })}
    </div>
  );
};
