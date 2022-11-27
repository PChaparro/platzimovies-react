import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Styles from './FavoriteIcon.module.css';

export const FavoriteIcon = ({ isFavorite, callback }) => {
  return (
    <span className={Styles.movie__heart} onClick={callback}>
      {isFavorite ? (
        <FaHeart color={'red'} title={'Remove from favorites'} size={'20px'} />
      ) : (
        <FaRegHeart color={'red'} title={'Add to favorites'} size={'20px'} />
      )}
    </span>
  );
};
