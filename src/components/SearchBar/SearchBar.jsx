import { FiSearch } from 'react-icons/fi';
import Styles from './SearchBar.module.css';

export const SearchBar = () => {
  return (
    <form className={`${Styles.form} container`}>
      <label className={Styles.form__label} htmlFor='criteria'>
        Search a movie:
      </label>
      <div className={Styles.form__row}>
        <input
          className={Styles.form__input}
          type='text'
          name='criteria'
          id='criteria'
          placeholder='Avengers'
        />
        <button className={Styles.form__submit}>
          <FiSearch color='white' size={'20px'} />
        </button>
      </div>
    </form>
  );
};
